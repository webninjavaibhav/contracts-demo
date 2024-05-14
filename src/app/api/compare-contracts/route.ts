import { NextRequest, NextResponse } from "next/server";

//LATEST MOCK ENPOINT / REAL ENDPOINT API
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const keys = Array.from(data.keys());
  let resultantData: any[] = [];
  const fileData = new FormData();
  const realBaseUrl = process.env.NEXT_PUBLIC_REAL_BASE_URL;
  const mockBaseUrl = process.env.NEXT_PUBLIC_MOCK_BASE_URL;
  try {
    for (const key of keys) {
      const file: File | null = data.get(key) as File;
      fileData.append("file", file);
    }
    const realResponse = await fetch(`${realBaseUrl}/compareContracts`, {
      method: "POST",
      body: data,
    });
    const parsedRealResponse = await realResponse.json();
    if (
      parsedRealResponse?.summary ||
      parsedRealResponse?.comparisons ||
      parsedRealResponse?.html
    ) {
      resultantData = parsedRealResponse;
    } else {
      const mockResponse = await fetch(`${mockBaseUrl}/compareContracts`, {
        method: "POST",
        body: fileData,
      });
      resultantData = await mockResponse.json();
    }
    return NextResponse.json({
      data: resultantData,
      success: true,
    });
  } catch (err) {
    return NextResponse.json({
      data: "Error generating the comparision",
      success: false,
    });
  }
}
