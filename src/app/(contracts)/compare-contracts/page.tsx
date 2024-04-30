"use client";

import React from "react";
import { useCompareContracts } from "./useCompareContracts";
import UploadedFiles from "@/components/UploadFiles";
import Compare from "@/components/CompareVersion";
import CompareContracts from "@/components/CompareContracts";

const ContractComparison = () => {
  const {
    uploadedFiles,
    comparedResult,
    loading,
    prompt,
    error,
    setPrompt,
    comparisonHandler,
    onUploadFiles,
    deleteFilesHandler,
    cancelRequestHandler,
  } = useCompareContracts();

  return (
    <div className="grid h-[100%] grid-cols-[0.8fr_1fr]">
      <UploadedFiles
        title="Contract Comparison"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        inputValue={prompt}
        setInputValue={setPrompt}
        onClick={comparisonHandler}
        onCancel={cancelRequestHandler}
        onDelete={deleteFilesHandler}
        loading={loading}
      />
      <CompareContracts
        loading={loading}
        error={error}
        data={comparedResult}
        compareFor={"contract"}
      />
    </div>
  );
};

export default ContractComparison;
