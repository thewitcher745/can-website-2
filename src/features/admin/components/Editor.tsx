import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { useEffect, useRef } from "react";

interface EditorProps {
  holder?: string;
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export default function Editor({
  holder = "editorjs-container",
  data,
  onChange,
}: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);

  const uploadToCloudinary = async (
    file: File,
    folder: string,
  ): Promise<string> => {
    try {
      const token = localStorage.getItem("admin_token");

      // Step 1: Get signature from backend
      const signatureResponse = await fetch(
        `/api/cloudinary-signature?folder=${folder}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!signatureResponse.ok) {
        throw new Error("Failed to get upload signature");
      }

      const { signature, timestamp, cloudName, apiKey } =
        await signatureResponse.json();

      // Step 2: Build FormData with exact alphabetical order
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      // Step 3: Upload directly to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await uploadResponse.json();

      if (!uploadResponse.ok) {
        console.error("❌ Cloudinary upload failed:", result);
        throw new Error(result.error?.message || "Upload failed");
      }

      // Return the secure URL
      return result.secure_url;
    } catch (error) {
      console.error("💥 Upload error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        data: data,
        placeholder: "Start writing your post...",
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  const url = await uploadToCloudinary(file, "content");
                  return {
                    success: 1,
                    file: { url },
                  };
                },
              },
            },
          },
        },
        onChange: async () => {
          if (onChange && editorRef.current) {
            const data = await editorRef.current.save();
            onChange(data);
          }
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="prose max-w-none">
      <div id={holder} className="editorjs-container" />
    </div>
  );
}
