import mongoose from "mongoose";
import app from "./src/app.js";
import { config } from "dotenv";
config();
const port = process.env.Port;
const mongoUrl = process.env.Mongo;

app.listen(port, async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Db connected");
    console.log(`Running on port: ${port}`);
  } catch (error) {
    console.log("Datebase connection error");
    console.log(error);
  }
});
