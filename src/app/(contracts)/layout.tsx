"use client";

import Navigation from "@/components/common/Navigation";
import { Context } from "@/store/Context";
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
    <>
      <Script
        src={`https://my.rabodis.appmixer.cloud/appmixer/appmixer.js`}
        onReady={() => {
          const appmixer = new (window as any).Appmixer({
            baseUrl: process.env.NEXT_PUBLIC_APP_MIXER_BASE_URL,
          });
          let username = "reactvirtual@rabodis.com";
          let password = "yardikube";
          appmixer.api
            .authenticateUser(username, password)
            .then((auth: any) => {
              appmixer.set("accessToken", auth.token);
              changeHandler(appmixer);
            });
        }}
      />
      <div className="flex gap-7 p-5 min-h-[inherit] max-h-[calc(100vh_-_40px)] bg-[#E7EAED]">
        <Navigation />
        <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
