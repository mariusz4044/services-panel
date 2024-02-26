import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url: string = process.env.DATABASE_URL;

const connectionDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(url);
    console.log(`[database]: Connected to the database ${url}`);
    return true;
  } catch (e) {
    console.log(`[database]: Error to connect to the database ${url} ${e}`);
    return false;
  }
};

export default connectionDB;
