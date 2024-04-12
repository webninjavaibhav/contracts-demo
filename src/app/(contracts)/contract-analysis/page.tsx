"use client";

import { useContractAnalysis } from "./useContractAnalysis";
import { Button } from "@/components/common/Button";
import { Typography } from "@mui/material";
import Summary from "@/components/Summary";
import UploadedFiles from "@/components/UploadFiles";

const ContractAnalysis = () => {
  const {
    uploadedFiles,
    analyzedFiles,
    value,
    loading,
    analyzeHandler,
    onUploadFiles,
    handleChange,
  } = useContractAnalysis();

  return (
    <>
      <UploadedFiles
        title="Contract"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
      />
      <div className="flex justify-end mt-10">
        <Button
          component="label"
          variant="contained"
          className="bg-neutral-700"
          onClick={analyzeHandler}
          disabled={loading}
        >
          <Typography variant="h6">
            {loading ? "Analyzing" : "Analyze"}
          </Typography>
        </Button>
      </div>
      <div>
        <Summary
          value={value}
          loading={loading}
          analyzedFiles={analyzedFiles}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default ContractAnalysis;
