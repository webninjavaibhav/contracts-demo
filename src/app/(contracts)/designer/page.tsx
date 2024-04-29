"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const Designer = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.Designer({
      el: "#designer",
    });
    widget?.set("flowId", "72b117a9-b33b-4da1-bde0-81559d0bc8e1");
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="designer"
      className="appmixer-container"
    ></div>
  );
};

export default Designer;
