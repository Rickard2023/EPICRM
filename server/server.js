
import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import cors from "cors";
import userRoute from "../server/routes/user.routes.js"
import { clientRoute } from "./routes/client.routes.js";
import cookieParser from "cookie-parser"
import { alertRoute } from "./routes/alert.routes.js";

config();

const app = express()
app.use(cors()); 
const port = 3000

app.use(cookieParser())
app.use(express.json());
app.use("/users", userRoute);
app.use("/clients",clientRoute); 
app.use("/alerts",alertRoute);
/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})*/


app.get('/', (req, res) => {

  res.send("<h1>TEST</h1>");
})

const initServer = async () => {

  try {
    await mongoose.connect(process.env.URI);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
  }
  catch(err){
    console.log("something's fishy here: err "+ err);
  }
}

initServer();
