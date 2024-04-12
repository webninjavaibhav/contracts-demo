import { NextRequest, NextResponse } from "next/server";

//OLD MOCK ENDPOINT : WORKS JUST FINE

// export async function POST(req: NextRequest) {
//   const data = await req.formData();
//   const keys = Array.from(data.keys());
//   const resultantData: { name: string; content: any }[] = [];
//   const fileData = new FormData();
//   try {
//     for (const key of keys) {
//       const file: File | null = data.get(key) as File;
//       fileData.set("file", file);
//       const response = await fetch(
//         `https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/36897c10-64bb-4d60-8e9e-5d005c6a4642/koch-legal-ai-counsel/1.0.0/m/ai/contractAnalysis`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "multipart/form-data",
//           },
//           body: fileData,
//         }
//       );

//       const parsedData = await response.json();
//       console.log("parsedData", parsedData);
//       resultantData.push({ name: "ll", content: parsedData });
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   return NextResponse.json({
//     data: resultantData,
//     success: true,
//   });
// }

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
      headers: {
        "content-type": "multipart/form-data",
      },
      body: fileData,
    });
    const parsedRealResponse = await realResponse.json();
    if (parsedRealResponse?.results) {
      resultantData.push(parsedRealResponse);
    } else {
      const mockResponse = await fetch(`${mockBaseUrl}/contractAnalysis`, {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: fileData,
      });
      const parsedMockData = await mockResponse.json();
      resultantData.push(parsedMockData);
    }
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({
    data: resultantData,
    success: true,
  });
}
