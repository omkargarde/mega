import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("\nMongoDB connected");
  } catch (error) {
    console.error("Mongodb connection failed", error);

    process.exit(1);
  }
};

export { connectDB };
