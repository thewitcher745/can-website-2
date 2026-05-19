import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { ProxyAgent, fetch as undiciFetch } from "undici";
import { buildApiUrl } from "@src/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const fetchFn = proxy
  ? (url: RequestInfo, init?: RequestInit) =>
      undiciFetch(
        url as string,
        { ...init, dispatcher: new ProxyAgent(proxy) } as any,
      )
  : fetch;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const authRes = await fetchFn(buildApiUrl("/api/v2/auth/me"), {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!authRes.ok) return res.status(401).json({ error: "Unauthorized" });
  } catch (e) {
    console.error("Auth failed:", e);
    return res.status(500).json({ error: "Auth verification failed" });
  }

  const { file, uploadByUrl } = req.body;

  if (uploadByUrl) return res.status(200).json({ url: uploadByUrl });
  if (!file) return res.status(400).json({ error: "No file provided" });

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "content",
      resource_type: "auto",
      timeout: 180000, // 3 minutes
      chunk_size: 6000000, // 6MB chunks for large files
    });
    return res.status(200).json({ url: result.secure_url });
  } catch (e: any) {
    console.error("Cloudinary upload failed:", e);
    return res.status(500).json({ error: e.message || "Upload failed" });
  }
}
