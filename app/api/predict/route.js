import { NextResponse } from "next/server";

export async function POST(req) {
    const { image } = await req.json();
    console.log("Received image:", image);

    const base64Image = image.replace("data:image/jpeg;base64,", "");
    console.log("\n\nBase64 image:", base64Image);

    

    return NextResponse.json({ message: "Image received" }, { status: 200 });
}
