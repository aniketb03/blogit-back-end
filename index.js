import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { blogRouter } from "./routes/blogs.js";
import { userRouter } from "./routes/users.js";
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);

  await client.connect();
  console.log("MongoDB is Connect");
  return client;
}
export const client = await createConnection();

app.listen(PORT, () => console.log(`App Started on ${PORT}`));

app.use("/blog", blogRouter);
app.use("/user", userRouter);
