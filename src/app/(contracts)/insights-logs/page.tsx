"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const InsightsLogs = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.InsightsLogs({
      el: "#insightLogs",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="insightLogs"
      className="appmixer-container"
    ></div>
  );
};

export default InsightsLogs;
