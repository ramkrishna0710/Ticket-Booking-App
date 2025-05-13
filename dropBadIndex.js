// dropBadIndex.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dropIndex() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result = await mongoose.connection.db
      .collection("tickets")
      .dropIndex("pnt_1");

    console.log("✅ Dropped index 'pnt_1':", result);
  } catch (err) {
    if (err.codeName === 'IndexNotFound') {
      console.log("ℹ️ Index 'pnt_1' was already removed.");
    } else {
      console.error("❌ Error dropping index:", err.message);
    }
  } finally {
    await mongoose.disconnect();
  }
}

dropIndex();
