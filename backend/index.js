import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";

import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

// MongoDB Connection for Vercel
mongoose.set("strictQuery", false);
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Always connect to DB per request (important for Vercel)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/products", productRoutes);

// Export serverless function
export const handler = serverless(app);
export default app;

// Run app locally only (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
