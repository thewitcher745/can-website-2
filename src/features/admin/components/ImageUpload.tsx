import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  helperText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  className = "",
  helperText,
}) => {
  const [uploading, setUploading] = useState(false);

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

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 1500000) {
      alert("Image must be under 1.5MB");
      return;
    }

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file, "content");
      onChange(url);
    } catch (err: any) {
      alert(err?.message || "Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 text-sm text-text-muted">{label}</label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-4 flex items-center justify-center min-h-[150px] ${
          value
            ? "border-primary/50 bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <span className="text-sm text-text-muted">Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative w-full h-full max-h-[200px] flex items-center justify-center">
            <Image
              src={value}
              alt={label}
              fill
              className="object-contain rounded"
              unoptimized={!value.includes("cloudinary")}
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-6 h-6 mb-2 text-text-muted" />
            <span className="text-sm text-text-main">
              Click to upload {label.toLowerCase()}
            </span>
            {helperText && (
              <span className="text-xs text-text-muted mt-1">{helperText}</span>
            )}
          </label>
        )}
      </div>

      <div className="mt-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste an image URL here..."
          className="w-full p-2 text-sm border rounded border-border bg-background text-text-main"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
