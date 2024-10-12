import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI()


export async function POST(req) {
    const { image } = await req.json();
    console.log("Received image:", image);

    const base64Image = image.replace("data:image/jpeg;base64,", "");
    // console.log("\n\nBase64 image:", base64Image);

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user", 
                content: [
                    {type: "text", text: "What specific food item is in this photo? Only list type of item (ex. Ice cream, Cereal, etc.)"},
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

    console.log(completion.choices[0]);

    const item = completion.choices[0].message.content;
    console.log("Item: ", item);

    return NextResponse.json({ message: item }, { status: 200 });
}
