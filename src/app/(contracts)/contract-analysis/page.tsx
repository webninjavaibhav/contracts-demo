"use client";

import { useContractAnalysis } from "./useContractAnalysis";
import Summary from "@/components/Summary";
import UploadedFiles from "@/components/UploadFiles";

const ContractAnalysis = () => {
  const {
    uploadedFiles,
    analyzedFiles,
    value,
    loading,
    policy,
    error,
    setPolicy,
    analyzeHandler,
    onUploadFiles,
    handleChange,
    deleteFilesHandler,
    cancelRequestHandler,
  } = useContractAnalysis();

  return (
    <div className="grid h-[100%] grid-cols-[0.75fr_1fr]">
      <UploadedFiles
        title="Contract Analysis"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        inputValue={policy}
        setInputValue={setPolicy}
        onClick={analyzeHandler}
        onCancel={cancelRequestHandler}
        onDelete={deleteFilesHandler}
        loading={loading}
      />
      <Summary
        value={value}
        error={error}
        loading={loading}
        analyzedFiles={analyzedFiles}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ContractAnalysis;
