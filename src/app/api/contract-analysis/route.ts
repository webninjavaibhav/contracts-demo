import { NextRequest, NextResponse } from "next/server";

//LATEST MOCK ENPOINT / REAL ENDPOINT API
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const keys = Array.from(data.keys());
  const resultantData: any[] = [];
  const fileData = new FormData();
  const realBaseUrl = process.env.NEXT_PUBLIC_REAL_BASE_URL;
  const mockBaseUrl = process.env.NEXT_PUBLIC_MOCK_BASE_URL;
  try {
    for (const key of keys) {
      const file: File | null = data.get(key) as File;
      fileData.set(key, file);
    }
    const realResponse = await fetch(`${realBaseUrl}/contractAnalysis`, {
      method: "POST",
      body: data,
    });
    const parsedRealResponse = await realResponse.json();
    if (parsedRealResponse?.results) {
      resultantData.push(parsedRealResponse);
    } else {
      const mockResponse = await fetch(`${mockBaseUrl}/contractAnalysis`, {
        method: "POST",
        body: fileData,
      });
      const parsedMockData = await mockResponse.json();
      resultantData.push(parsedMockData);
    }
    return NextResponse.json({
      data: resultantData,
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      data: "Error generating contract analysis",
      success: true,
    });
  }
}
