import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import productRouter from "./routes/productRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import bodyParser from "body-parser";


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Load environment variables from .env file
dotenv.config();

// const uri = process.env.MONGO_URI;

const uri= "mongodb+srv://AmithASD:amithasd@cluster0.wopdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('uri================>>>>>', uri);

const connect = async() => {
    try {
      await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("connected");
    } catch (error) {
      console.log("connection faild", error);
    }
}
connect();

const port = process.env.PORT || 10000; 
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRouter);
