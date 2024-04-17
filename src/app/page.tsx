"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Button } from "@/components/common/Button";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Call your API route for authentication
    const response = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.message === "ok") {
      localStorage.setItem("token", data?.token);
      const expiresIn = 3600; // Expires in 1 hour (adjust as needed)
      const expirationTime = Date.now() + expiresIn * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
      router.push("/contract-analysis");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Legal Counsel
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <TextField
              type="password"
              fullWidth
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-[#00D3AF]  hover:bg-[#00D3AF] p-2 cursor-pointer flex items-center gap-1"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
