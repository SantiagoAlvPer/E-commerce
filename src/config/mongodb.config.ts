import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToMongoDB() {
  try {
    console.log("🔌 Attempting to connect to MongoDB...");
    const uri = process.env.MONGO_URI!;
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Opcional: Cierra el proceso si la conexión falla
  }
}
