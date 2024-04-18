"use client";

import React from "react";
import { ContextProvider } from "@/store/Context";

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ContextProvider>{children}</ContextProvider>;
};

export default ContextWrapper;
