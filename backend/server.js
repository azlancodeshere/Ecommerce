import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/db.js";
import userRoutes from "./src/routes/User.route.js";
import productRoute from "./src/routes/product.route.js";
import CartRoutes from "./src/routes/cart.route.js"

dotenv.config();

const app = express();

// ESM mein __dirname banane ke liye
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParse());

// Root
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is ready"
    });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
app.use("/api/cart",CartRoutes)

// Uploaded images serve karne ke liye
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});