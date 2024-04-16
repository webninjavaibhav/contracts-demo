"use client";

import React from "react";
import { useCompareVersions } from "./useCompareVersions";
import UploadedFiles from "@/components/UploadFiles";
import { Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import Compare from "@/components/Compare";

const VersionComparison = () => {
  const {
    uploadedFiles,
    comparedResult,
    loading,
    comparisonHandler,
    onUploadFiles,
  } = useCompareVersions();

  return (
    <div className="flex flex-col gap-5">
      <UploadedFiles
        title="Contract Comparison"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        onClick={comparisonHandler}
        loading={loading}
      />
      <div className="bg-[#fff] rounded-xl min-h-[600px]">
        <Compare
          loading={loading}
          data={comparedResult}
          compareFor={"version"}
        />
      </div>
    </div>
  );
};

export default VersionComparison;
