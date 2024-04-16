"use client";

import Navigation from "@/components/common/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
        localStorage.clear();
        router.push("/");
      }
    } else {
      localStorage.clear();
      router.push("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr] w-full">
      <Navigation />
      <div className="flex flex-col w-full px-16 py-5 bg-[#DCE0E7] max-h-[100vh] overflow-auto">
        {children}
      </div>
    </div>
  );
}
