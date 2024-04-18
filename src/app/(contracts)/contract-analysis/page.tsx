"use client";

import { useContractAnalysis } from "./useContractAnalysis";
import Summary from "@/components/Summary";
import UploadedFiles from "@/components/UploadFiles";
import { Context } from "@/store/Context";
import { useContext } from "react";

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
  const { value: appMixer } = useContext(Context);

  console.log("appMixer", appMixer);

  return (
    <div className="flex flex-col gap-5">
      <UploadedFiles
        title="Contract Analysis"
        uploadedFiles={uploadedFiles}
        onUploadFiles={onUploadFiles}
        inputValue={policy}
        setInputValue={setPolicy}
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
