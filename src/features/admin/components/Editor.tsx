import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import LinkTool from "@editorjs/link";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import CodeTool from "@editorjs/code";
import RawTool from "@editorjs/raw";
import Embed from "@editorjs/embed";
import { supabase } from "../../../lib/supabase";

interface EditorProps {
  data?: any;
  onChange: (data: any) => void;
  holder: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (data && ejInstance.current) {
      const editor = ejInstance.current;
      editor.isReady.then(() => {
        // Only render if data is different and not empty
        if (data.blocks && data.blocks.length > 0) {
          // Check if the current editor content is empty or different
          editor.save().then((currentData) => {
            if (
              JSON.stringify(currentData.blocks) !== JSON.stringify(data.blocks)
            ) {
              editor.render(data);
            }
          });
        }
      });
    }
  }, [data]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: holder,
      data: data || {},
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange(content);
      },
      tools: {
        header: Header,
        list: List,
        table: Table,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                try {
                  const fileExt = file.name.split(".").pop();
                  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
                  const filePath = `editor/${fileName}`;

                  const { error: uploadError } = await supabase.storage
                    .from("images")
                    .upload(filePath, file);

                  if (uploadError) throw uploadError;

                  const {
                    data: { publicUrl },
                  } = supabase.storage.from("images").getPublicUrl(filePath);

                  return {
                    success: 1,
                    file: {
                      url: publicUrl,
                    },
                  };
                } catch (error) {
                  console.error("Editor upload error:", error);
                  return {
                    success: 0,
                  };
                }
              },
              uploadByUrl: async (url: string) => {
                return {
                  success: 1,
                  file: {
                    url: url,
                  },
                };
              },
            },
          },
        },
        inlineCode: InlineCode,
        marker: Marker,
        quote: Quote,
        paragraph: Paragraph,
        linkTool: LinkTool,
        checklist: Checklist,
        delimiter: Delimiter,
        warning: Warning,
        code: CodeTool,
        raw: RawTool,
        embed: Embed as any,
      },
    });
  };

  return <div id={holder} className="editor-js-container" />;
};

export default Editor;
