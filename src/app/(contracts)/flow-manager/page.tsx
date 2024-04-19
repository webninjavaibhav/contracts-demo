"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const FlowManager = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.FlowManager({
      el: "#flowManager",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="flowManager"
      className="[&>div]:static"
    ></div>
  );
};

export default FlowManager;
