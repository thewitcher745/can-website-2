import React, { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert("Error uploading image: " + (error.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 text-sm text-text-muted">{label}</label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all flex flex-col items-center justify-center min-h-[150px] ${
          value
            ? "border-primary/50 bg-primary/5"
            : "border-border hover:border-primary/50 bg-background"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <span className="text-sm text-text-muted">Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative w-full aspect-video md:aspect-square max-h-[200px] flex items-center justify-center overflow-hidden rounded-md bg-black/20">
            <img
              src={value}
              alt={label}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            className="flex flex-col items-center cursor-pointer w-full h-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-3 rounded-full bg-surface mb-3">
              <Upload className="w-6 h-6 text-text-muted" />
            </div>
            <span className="text-sm font-medium text-text-main">
              Click to upload {label.toLowerCase()}
            </span>
            {helperText && (
              <span className="text-xs text-text-muted mt-1">{helperText}</span>
            )}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="mt-2 flex flex-col">
        <div className="relative group">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste an image URL here..."
            className="w-full p-2.5 pr-10 text-sm rounded-lg border border-border bg-background text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50 shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <div
              className={`w-2 h-2 rounded-full ${value ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-border"}`}
              title={value ? "Valid link" : "Empty link"}
            />
          </div>
        </div>
        {helperText && !value && (
          <span className="text-xs text-text-muted mt-1.5 ml-1">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
