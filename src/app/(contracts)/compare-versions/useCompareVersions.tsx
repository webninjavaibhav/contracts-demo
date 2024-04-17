"use client";

import { useEffect, useState } from "react";

export const useCompareVersions = () => {
  const [uploadedFiles, setUploadFiles] = useState<File[]>([]);
  const [comparedResult, setComparedResult] = useState<{
    summary?: number;
    comparisons: any[];
  }>({ comparisons: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const onUploadFiles = (file: File[], uploadedFiles: File[]) => {
    file?.forEach((f) => {
      const existingFile = uploadedFiles?.find((e) => e?.name === f?.name);
      if (!existingFile) {
        setUploadFiles((prev) => [...prev, f]);
      }
    });
  };

  const deleteFilesHandler = (fileName: string) => {
    const deletedFileIndex = uploadedFiles?.findIndex(
      (e) => e?.name === fileName
    );
    uploadedFiles?.splice(0, deletedFileIndex);
  };

  const comparisonHandler = async () => {
    setLoading(true);
    const data = new FormData();
    uploadedFiles.forEach((file, index) => {
      data.set(`file${index + 1}`, file);
    });
    const response = await fetch(`api/compare-versions`, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    setComparedResult(result?.data);
    setLoading(false);
  };

  return {
    uploadedFiles,
    comparedResult,
    loading,
    comparisonHandler,
    onUploadFiles,
    deleteFilesHandler,
  };
};
