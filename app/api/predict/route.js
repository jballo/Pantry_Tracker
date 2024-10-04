import { NextResponse } from "next/server";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

export async function POST(req) {
    const { image } = await req.json();
    console.log("Received image:", image);

    const base64Image = image.replace("data:image/jpeg;base64,", "");
    console.log("\n\nBase64 image:", base64Image);

    const clientOptions = {
        apiEndpoint: `${process.env.VERTEX_AI_ENDPOINT_ID}-aiplatform.googleapis.com`,
    };

    const client = new PredictionServiceClient(clientOptions);

    const request = {
        instances: [{ image: base64Image }],
    };

    const [google_response] = await client.predict(request);
    console.log("Google response:", google_response);

    return NextResponse.json({ message: "Image received" }, { status: 200 });
}
