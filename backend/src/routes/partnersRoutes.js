import express from "express";
import { getAllPartners, getPartnerById, createPartner, updatePartner, deletePartner } from "../controllers/partnersController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllPartners);
router.get("/:id", getPartnerById);

router.post("/", requireAuth, createPartner);
router.put("/:id", requireAuth, updatePartner);
router.delete("/:id", requireAuth, deletePartner);

export default router;
