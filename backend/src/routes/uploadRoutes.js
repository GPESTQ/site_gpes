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

router.patch("/:id/photo", requireAuth, upload.single("photo"), uploadPersonPhoto);
router.patch("/:id/pdf", requireAuth, upload.single("pdf"), uploadPaperPdf);

export default router;
