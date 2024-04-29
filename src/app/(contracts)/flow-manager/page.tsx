"use client";

import { Context } from "@/store/Context";
import React, { useContext, useEffect, useRef, useState } from "react";

const FlowManager = () => {
  const { value: appMixer } = useContext(Context);
  const [flowId, setFlowId] = useState();

  useEffect(() => {
    const widget = (appMixer as any)?.ui?.FlowManager({
      el: "#flowManager",
      options: {
        menu: [
          {
            event: "flow:open",
            label: "Open",
          },
          { event: "flow:insights", label: "Insights" },
          { event: "flow:clone", label: "Clone" },
          { event: "flow:share", label: "Share" },
          { event: "flow:remove", label: "Remove" },
          { event: "my-custom-event", label: "Custom Event" },
        ],
      },
    });
    widget?.open();
    widget?.on("flow:open", function (flowId: any) {
      setFlowId(flowId);
    });

    return () => {
      widget && widget.close();
    };
  }, [appMixer as any]);

  useEffect(() => {
    const designer = (appMixer as any)?.ui?.Designer({
      el: "#flowManager",
      options: {
        menu: [
          {
            event: "flow:rename",
            label: "Rename",
          },
          {
            event: "flow:share",
            label: "Share",
          },
          { event: "flow:wizard-builder", label: "Wizard" },
          { event: "flow:export-svg", label: "Export SVG" },
          { event: "flow:export-png", label: "Export PNG" },
          { event: "flow:print", label: "Print" },
        ],
        toolbar: [
          ["undo", "redo"],
          ["zoom-to-fit", "zoom-in", "zoom-out"],
          ["logs"],
        ],
      },
    });
    if (flowId) {
      designer.set("flowId", flowId);
      designer.open();
    }

    return () => {
      designer && designer.close();
    };
  }, [appMixer as any, flowId]);

  return (
    <div
      id="flowManager"
      className="appmixer-container"
    ></div>
  );
};

export default FlowManager;
