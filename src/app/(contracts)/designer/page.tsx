"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const Designer = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.Designer({
      el: "#designer",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="designer"
      className="[&>div]:static"
    ></div>
  );
};

export default Designer;
