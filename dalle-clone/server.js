const POST = 8000;
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const { OpenAIAPI } = require('openai');

app.post('/images', async (req, res) => {
    try {
        const openai = new OpenAIAPI({
            key: process.env.OPENAI_API_KEY,
        });

        // Assuming you want to generate an image using the "dall-e-3" model and a prompt
        const prompt = "A cute baby sea otter";
        const image = await openai.images.create({
            model: "image-alpha-001", // Update with the correct model name
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        console.log(image.data);
        res.json(image.data); // Send the generated image data as the response
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(POST, () => {
    console.log(`Server is running on port ${POST}`);
});
