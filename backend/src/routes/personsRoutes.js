import express from "express";
import { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson } from "../controllers/personsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllPersons);
router.get("/:id", getPersonById);

router.post("/", requireAuth, createPerson);
router.put("/:id", requireAuth, updatePerson);
router.delete("/:id", requireAuth, deletePerson);

export default router;
