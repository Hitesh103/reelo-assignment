import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { connectDb } from "./config/db.js";
import apiRoutes from './router/index.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(5000, async () => {
    console.log("Server Started at " + 5000);
    console.log("Connecting to MongoDB...");
    connectDb();
});

app.use("/api", apiRoutes);

app.get("/", (req, res)=>{
    res.send("<h1>Namaste From Server 🙏</h1>");
})
