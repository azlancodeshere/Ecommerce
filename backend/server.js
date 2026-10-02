import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/db.js";
import userRoutes from "./src/routes/User.route.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is ready"
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);


connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

