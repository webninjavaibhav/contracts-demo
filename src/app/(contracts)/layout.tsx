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
    if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      localStorage.clear();
      router.push("/");
    }
  }, []);

  return (
    <div className="flex w-full">
      <Navigation />
      <div className="flex flex-col w-full p-5 pl-[250px]">{children}</div>
    </div>
  );
}
