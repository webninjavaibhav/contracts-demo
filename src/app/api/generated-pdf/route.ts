import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(data);
    const pdfBytes = await page.pdf({ format: "A4" });
    const blob = new Blob([pdfBytes]);
    await browser.close();
    return new NextResponse(blob);
  } catch (err: any) {
    return NextResponse.json({
      data: { message: err.message },
      success: false,
    });
  }
}
