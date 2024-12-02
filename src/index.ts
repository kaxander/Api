import express  from "express";
import conectToDatabase from "./config/database";
import 'dotenv/config';
import { router } from "./router";

const app = express();
const port = 5000;

app.use(express.json());

app.use(router)

app.listen(port, async () => {
  await conectToDatabase();
  console.log(`🚀 Server is running on http://localhost:${port}`);
});