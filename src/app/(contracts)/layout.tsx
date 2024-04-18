"use client";

import Navigation from "@/components/common/Navigation";
import { Context, ContextProvider } from "@/store/Context";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useContext, useEffect } from "react";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { changeHandler } = useContext(Context);

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
      <Script
        src={`https://my.rabodis.appmixer.cloud/appmixer/appmixer.js`}
        onReady={() => {
          const appmixer = new (window as any).Appmixer({
            baseUrl: process.env.NEXT_PUBLIC_APP_MIXER_BASE_URL,
          });
          changeHandler(appmixer);
        }}
      />
      <Navigation />
      <div className="flex flex-col w-full px-16 py-5 bg-[#DCE0E7] max-h-[100vh] overflow-auto">
        {children}
      </div>
    </div>
  );
}
