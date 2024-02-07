import express from "express";
import * as dotenv from "dotenv";
import {OpenAI} from "openai"; 


dotenv.config();

const router = express.Router();



const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY}); 

router.route('/').get((req,res)=>{
    res.send("Hello from DALL-E");
});

router.route('/').post(async (req,res)=>{
    try {
        const {prompt} = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            model: "dall-e-2",
            n:1,
            size:'1024x1024',
            response_format:'url'
        });
        // console.log(aiResponse);
        const image = aiResponse.data[0].url;

        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;

