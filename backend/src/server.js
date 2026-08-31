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
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('(.*)', (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.use((err, _, res, _) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT", PORT);
    });
});
