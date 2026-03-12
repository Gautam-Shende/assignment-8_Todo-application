
import express from "express"
import mongoose from "mongoose"

import cors from "cors";

import dotenv from "dotenv";
import TodoRoutes from "./routes/TodoRoutes.js";

dotenv.config();

const app = express();

// app.use cors()
app.use(cors());

app.use(express.json());

// mongodb database
mongoose
  .connect(process.env.MONGO_URI, { dbName: "MERN_To_Do_Application" })
  // console.log("db connect")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", TodoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
