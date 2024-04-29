"use client";

import React from "react";
import { useCompareVersions } from "./useCompareVersions";
import UploadedFiles from "@/components/UploadFiles";
import { Typography } from "@mui/material";
import { Button } from "@/components/common/Button";
import Compare from "@/components/CompareVersion";
import CompareVersion from "@/components/CompareVersion";

const VersionComparison = () => {
  const {
    uploadedFiles,
    comparedResult,
    loading,
    error,
    comparisonHandler,
    onUploadFiles,
    deleteFilesHandler,
    cancelRequestHandler,
  } = useCompareVersions();

  return (
    <div className="grid h-[100%] grid-cols-[0.8fr_1fr]">
      <UploadedFiles
        title="Version Comparison"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        onClick={comparisonHandler}
        onCancel={cancelRequestHandler}
        onDelete={deleteFilesHandler}
        loading={loading}
      />
      <div className="bg-[#fff] rounded-r-lg min-h-[600px]">
        <CompareVersion
          loading={loading}
          error={error}
          data={comparedResult}
          compareFor={"version"}
        />
      </div>
    </div>
  );
};

export default VersionComparison;
