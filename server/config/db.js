import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI =", process.env.MONGO_URI);

    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    console.error("Database Connection Error");
    console.error(error.message);
    throw error;
  }
};

export default connectDB;