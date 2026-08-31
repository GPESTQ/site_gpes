import express from "express";
import { getAllPapers, getPaperById, createPaper, updatePaper, deletePaper } from "../controllers/papersController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllPapers);
router.get("/:id", getPaperById);

router.post("/", requireAuth, createPaper);
router.put("/:id", requireAuth, updatePaper);
router.delete("/:id", requireAuth, deletePaper);

export default router;
