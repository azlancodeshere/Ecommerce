import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";

import connectDB from "./db/db.js";
import userRoutes from "./src/routes/User.route.js"
import "dotenv/config";

dotenv.config();

const app = express();

// Middleware
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
));
app.use(express.json());
app.use(cookieParse());



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is ready"
    });
});


app.use("/api/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;




connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

