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
    deleteFilesHandler,
  } = useContractAnalysis();

  return (
    <div className="flex flex-col gap-5">
      <UploadedFiles
        title="Contract Analysis"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        policy={policy}
        setPolicy={setPolicy}
        onClick={analyzeHandler}
        onDelete={deleteFilesHandler}
        loading={loading}
      />
      <div className="bg-[#fff] rounded-xl min-h-[300px]">
        <Summary
          value={value}
          loading={loading}
          analyzedFiles={analyzedFiles}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContractAnalysis;
