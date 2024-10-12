import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI()

const ItemResponse = z.object({
    itemName: z.string(),
    category: z.string(),
});


export async function POST(req) {
    // Step 1: Extract the base64 string from the request body
    const { image } = await req.json();

    const promptText = `
        Identify the food item name, for the exact name of the food, and its category for the general type, from this image. 
    `;
    try {
        // Step 2: Send a prompt to the OpenAI API to get a response with the item name and category based on the image
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
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
            response_format: zodResponseFormat(ItemResponse, "item_response"),
        });
        
        // Step 3: Extract the predicted item name and category from the API's response
        const itemInfo = response.choices[0].message.content;
        // Step 4: Convert string to Json Object
        console.log(itemInfo);
        const parsedItemInfo = JSON.parse(itemInfo);
        console.log("Item info: ", parsedItemInfo);

        // Step 5: Return the parsed item information as a JSON response
        return NextResponse.json({ message: parsedItemInfo }, { status: 200 });

    } catch (error) {
        console.error("Prediction failed for item.")
        return NextResponse.json({ error: "Prediction failed for item." }, { status: 500 });
    }
}
