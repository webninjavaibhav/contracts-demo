"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const Connectors = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.Connectors({
      el: "#connectors",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="connectors"
      className="[&>div]:static"
    ></div>
  );
};

export default Connectors;
