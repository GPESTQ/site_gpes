import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import uploadRoutes from "./routes/uploadRoutes.js";
import personsRoutes from "./routes/personsRoutes.js";
import papersRoutes from "./routes/papersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);

app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/persons", personsRoutes);
app.use("/api/papers", papersRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada na API" });
});

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT", PORT);
    });
});
