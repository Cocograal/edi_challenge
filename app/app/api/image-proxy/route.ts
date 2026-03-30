export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing image URL", {
      status: 400,
    });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new Response("Failed to fetch image", {
        status: 500,
      });
    }

    const contentType =
      response.headers.get("content-type") ?? "image/jpeg";

    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);

    return new Response("Image proxy failed", {
      status: 500,
    });
  }
}