// pages/api/login.js

import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { username, password } = data;
  const validUsername = "admin";
  const validPassword = "password";

  if (username === validUsername && password === validPassword) {
    const token = jwt.sign({ username }, "contract-demo-key", {
      expiresIn: "1h",
    });
    return NextResponse.json({ message: "ok", token });
  } else {
    return NextResponse.json({ message: "Invalid username or password" });
  }
}
