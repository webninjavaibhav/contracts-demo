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
    <>
      <UploadedFiles
        title="Contract Comparison"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
      />
      <div className="flex justify-end mt-10">
        <Button
          component="label"
          variant="contained"
          className="bg-neutral-700"
          onClick={comparisonHandler}
          disabled={loading}
        >
          <Typography variant="h6">
            {loading ? "Fetching results..." : "Compare Versions"}
          </Typography>
        </Button>
      </div>
      <div>
        <Compare
          loading={loading}
          data={comparedResult}
          compareFor={"version"}
        />
      </div>
    </>
  );
};

export default VersionComparison;
