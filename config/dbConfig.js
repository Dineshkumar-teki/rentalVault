import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("db is already connected...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("db connected successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
