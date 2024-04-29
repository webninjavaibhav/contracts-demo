"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const Integrations = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.Integrations({
      el: "#integrations",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="integrations"
      className="appmixer-container"
    ></div>
  );
};

export default Integrations;
