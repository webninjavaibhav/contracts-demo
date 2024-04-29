"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect } from "react";

const PeopleTasks = () => {
  const { value: appMixer } = useContext(Context);

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.PeopleTasks({
      el: "#peopleTasks",
    });
    widget?.open();
    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  return (
    <div
      id="peopleTasks"
      className="appmixer-container"
    ></div>
  );
};

export default PeopleTasks;
