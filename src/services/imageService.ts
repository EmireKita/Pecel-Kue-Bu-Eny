// src/services/imageUploadService.ts
import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "umkm-bot");

  const cloudName = "db39ewz7c";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await axios.post(url, formData);
  return response.data.secure_url; // URL yang aman dari Cloudinary
};
