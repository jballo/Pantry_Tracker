import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI()


export async function POST(req) {
    const { image } = await req.json();
    // console.log("Received image:", image);

    // const base64Image = image.replace("data:image/jpeg;base64,", "");
    // console.log("\n\nBase64 image:", base64Image);
    const promptText = `
        Identify the food item and its category from this image. 
        Respond in JSON format with two keys: 'item' for the exact name of the food, and 'category' for its general type. 
        For example:
        {
            "item": "Juicy Juice 100% Apple Juice",
            "category": "Beverage"
        }
    `;
    try {
    
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "user", 
                    content: [
                        {type: "text", text: promptText},
                        {
                            type: "image_url",
                            image_url: {
                                "url": image,
                            },
                        },
                    ],
                },
            ],
            model: "gpt-4o-mini",
        });
    
        // console.log(completion.choices[0]);
    
        const item = completion.choices[0].message.content;
        // console.log("Item: ", item);
        const response = completion.choices[0].message.content;
        // Step 1: Remove the Markdown backticks and 'json' label
        const cleanedResponse = response.replace(/```json|```/g, '').trim();
        // Step 2: Convert string into JSON
        const parsedResponse = JSON.parse(cleanedResponse);
        console.log("Parsed JSON:", parsedResponse);
        // Step 3: Return the object
        return NextResponse.json({ message: parsedResponse }, { status: 200 });

    } catch (error) {
        console.error("Prediction failed for item.")
        return NextResponse.json({ error: "Prediction failed for item." }, { status: 500 });
    }
}
