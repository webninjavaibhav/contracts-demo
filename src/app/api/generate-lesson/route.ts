import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data: string = await req.json();
    const f1: any = { prompt: data };
    let baseUrl ="http://ec2-34-239-254-199.compute-1.amazonaws.com:3002/openai";
    const response: any = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(f1),
    });
    const parse = await response.json();
    return NextResponse.json({
      data: parse ,
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error generating the lesson",
      success: false,
    });
  }
}
