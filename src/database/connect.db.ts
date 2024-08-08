import mongoose from "mongoose";
import { connect } from "mongoose";
const connectionString = process.env.DATABASE_URL!;
const password = process.env.DB_PASSWORD!;

const CS = connectionString?.replace("<password>", password);

export async function connectToDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      // console.log("already connected to db");
    } else {
      console.log("connecting to db....");

      await connect(CS, { dbName: "cogent" });

      console.log("mongo connected");
    }
  } catch (err) {
    console.log(err);
    console.log("couldn't connect to db");
    throw new Error("couldn't connect to DB error");
  }
}
