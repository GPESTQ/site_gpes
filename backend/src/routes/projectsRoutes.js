import express from "express";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/projectsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
