"use client";

import { useContractAnalysis } from "./useContractAnalysis";
import { Button } from "@/components/common/Button";
import { TextField, Typography } from "@mui/material";
import Summary from "@/components/Summary";
import UploadedFiles from "@/components/UploadFiles";

const ContractAnalysis = () => {
  const {
    uploadedFiles,
    analyzedFiles,
    value,
    loading,
    policy,
    setPolicy,
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
      <div className="flex gap-10 pl-10 mt-10">
        <TextField
          fullWidth
          value={policy}
          placeholder="Policies"
          onChange={(e) => setPolicy(e.target.value)}
        />
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
