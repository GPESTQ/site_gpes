import express from "express";
import upload from "../middleware/upload.js";
import { uploadPersonPhoto, uploadPaperPdf } from "../controllers/uploadController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/photo", requireAuth, upload.single("photo"), (req, res) => {
    console.log("req.file:", req.file);
    try {
        res.status(200).json({ imageUrl: req.file.path });
    } catch (error) {
        console.error("Error in upload photo route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/pdf", requireAuth, upload.single("pdf"), (req, res) => {
    console.log("req.file:", req.file);
    try {
        res.status(200).json({ imageUrl: req.file.path });
    } catch (error) {
        console.error("Error in upload pdf route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const MAX_PROJECT_IMAGES = 10;

router.post("/project-images", requireAuth, upload.array("images", MAX_PROJECT_IMAGES), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Nenhuma imagem enviada" });
        }
        const imageUrls = req.files.map((file) => file.path);
        res.status(200).json({ imageUrls });
    } catch (error) {
        console.error("Error in project images upload route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch("/:id/photo", requireAuth, upload.single("photo"), uploadPersonPhoto);
router.patch("/:id/pdf", requireAuth, upload.single("pdf"), uploadPaperPdf);

export default router;
