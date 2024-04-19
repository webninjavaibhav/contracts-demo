"use client";

import { Context } from "@/store/Context";
import { useContext, useEffect, useState } from "react";

export const useCompareContracts = () => {
  const [uploadedFiles, setUploadFiles] = useState<File[]>([]);
  const [comparedResult, setComparedResult] = useState<{
    summary?: number;
    comparisons: any[];
    html?: string;
  }>({ comparisons: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const { controller, stopRequests } = useContext(Context);

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
    prompt && data.set("prompt", prompt);
    const response = await fetch(`api/compare-contracts`, {
      method: "POST",
      body: data,
      signal: (controller as any)?.signal,
    });
    const result = await response.json();
    setComparedResult(result?.data);
    setPrompt("");
    setLoading(false);
  };

  const cancelRequestHandler = () => {
    stopRequests();
    setLoading(false);
  };

  return {
    uploadedFiles,
    comparedResult,
    loading,
    prompt,
    setPrompt,
    comparisonHandler,
    onUploadFiles,
    deleteFilesHandler,
    cancelRequestHandler,
  };
};
