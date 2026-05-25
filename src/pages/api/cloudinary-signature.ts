import { buildApiUrl } from "@src/config";
import {
  serverSideVerifyAdminToken,
  verifyAdminToken,
} from "@src/domains/admin/api";
import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import { ProxyAgent, fetch as undiciFetch } from "undici";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Proxy function set up for cloudinary and API access
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
  const token = req.headers.authorization?.replace("Bearer ", "");
  const folder = req.query.folder;

  if (!token) {
    console.error("❌ No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const isValid = await serverSideVerifyAdminToken(token);

    if (!isValid) {
      console.error("❌ Unauthorized - auth check failed");
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    console.error("💥 Auth failed:", e);
    return res.status(500).json({ error: "Auth verification failed" });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = {
    folder: folder,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  const response = {
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };

  res.status(200).json(response);
}
