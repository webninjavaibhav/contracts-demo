import { useEffect, useState } from "react";

export const useContractAnalysis = () => {
  const [uploadedFiles, setUploadFiles] = useState<File[]>([]);
  const [analyzedFiles, setAnalyzedFiles] = useState<{
    totalRecords: number;
    results: any[];
  }>({ totalRecords: 0, results: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const [value, setValue] = useState(0);

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

  const analyzeHandler = async () => {
    setLoading(true);
    const data = new FormData();
    uploadedFiles.forEach((file, index) => {
      data.set(`file${index + 1}`, file);
    });
    const response = await fetch(`api/contract-analysis`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    setAnalyzedFiles(result?.data?.[0]);
    setLoading(false);
  };

  return {
    uploadedFiles,
    analyzedFiles,
    value,
    loading,
    analyzeHandler,
    onUploadFiles,
    handleChange,
  };
};
