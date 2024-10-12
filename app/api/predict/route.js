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
                    {type: "text", text: "What's in this image?"},
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

    return NextResponse.json({ message: "Image received" }, { status: 200 });
}
