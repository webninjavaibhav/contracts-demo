import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiUrl = `http://rabodis-ai-legal-counsel-nprod.us-e2.cloudhub.io/api/search`;

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
  }
}
