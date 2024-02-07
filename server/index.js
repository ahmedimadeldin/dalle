import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";


// setting up the dotenv 
dotenv.config();

const app = express();
app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//  })
app.use(express.json({limit: "50mb"}));

// create middleware for the api endpoints :

app.use('/api/post',postRoutes);
app.use('/api/dalle',dalleRoutes);

app.get("/",async(req,res)=>{
    res.send("Hello from DALL-E");
})

const startServer = async ()=>{

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,()=>{
            console.log("server has started on port https://localhost:8080");
        })
    } catch (error) {
        console.log(error);
    }
    
}

startServer();