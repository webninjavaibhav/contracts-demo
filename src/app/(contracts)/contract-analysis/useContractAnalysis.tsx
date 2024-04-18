import { Context } from "@/store/Context";
import { useContext, useEffect, useState } from "react";

export const useContractAnalysis = () => {
  const [uploadedFiles, setUploadFiles] = useState<File[]>([]);
  const [analyzedFiles, setAnalyzedFiles] = useState<{
    totalRecords: number;
    results: any[];
  }>({ totalRecords: 0, results: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [policy, setPolicy] = useState<string>("");
  const [value, setValue] = useState(0);
  const { controller, stopRequests } = useContext(Context);

  const onUploadFiles = (file: File[], uploadedFiles: File[]) => {
    file?.forEach((f) => {
      const existingFile = uploadedFiles?.find((e) => e?.name === f?.name);
      if (!existingFile) {
        setUploadFiles((prev) => [...prev, f]);
      }
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const deleteFilesHandler = (fileName: string) => {
    const updatedFiles = uploadedFiles?.filter((e) => e?.name !== fileName);
    setUploadFiles(updatedFiles);
  };

  const analyzeHandler = async () => {
    setLoading(true);
    const data = new FormData();
    uploadedFiles.forEach((file, index) => {
      data.set(`file${index + 1}`, file);
    });
    policy && data.set("policies", policy);
    const response = await fetch(`api/contract-analysis`, {
      method: "POST",
      body: data,
      signal: (controller as any)?.signal,
    });
    const result = await response.json();
    setAnalyzedFiles(result?.data?.[0]);
    setPolicy("");
    setLoading(false);
  };

  const cancelRequestHandler = () => {
    stopRequests();
    setLoading(false);
  };

  return {
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
    cancelRequestHandler,
  };
};
