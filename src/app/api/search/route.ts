import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiUrl = `${process.env.NEXT_PUBLIC_LEGAL_WIKI_BASE_URL}/search`;

  const { query, sources } = await req.json();
  const requestBody = { query, sources };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Failed to fetch data" });
  }
}
