import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, image } = body;

    if (!name || !description || !image) {
      return NextResponse.json({ success: false, error: "Missing data" });
    }

    const base64Data = image.split(",")[1];
    const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: "image/png" });

    // Upload image to Pinata
    const imageForm = new FormData();
    imageForm.append("file", blob, "badge.png");

    const imageRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
      body: imageForm,
    });
    const imageData = await imageRes.json();

    if (!imageData.IpfsHash) {
      return NextResponse.json({ success: false, error: "Image upload failed" });
    }

    console.log(`meta data:\nimageUrl: ipfs://${imageData.IpfsHash}` )
    return NextResponse.json({
      success: true,
      imageUrl: `ipfs://${imageData.IpfsHash}`,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}