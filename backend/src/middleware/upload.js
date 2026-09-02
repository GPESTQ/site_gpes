import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: (_, file) => {
        const isPdf = file.mimetype === "application/pdf";
        const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        return {
            folder: isPdf ? "gpes/papers" : "gpes/images",
            resource_type: isPdf ? "raw" : "image",
            public_id: isPdf ? `${uniqueId}.pdf` : uniqueId,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Tipo de arquivo não permitido"));
    },
});

export default upload;
