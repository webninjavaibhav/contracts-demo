import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(data);
    await page.emulateMediaType("screen");
    const pdfBytes = await page.pdf();
    return new NextResponse(pdfBytes);
  } catch (err: any) {
    return NextResponse.json({
      data: { message: err.message },
      success: false,
    });
  }
}
