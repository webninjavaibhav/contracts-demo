import { CircularProgress } from "@mui/material";
import React from "react";
import DropZone from "../DropZone";
import DocumentList from "../DocumentList";
import { Button } from "../common/Button";
import Icons from "../common/Icons";

const UploadedFiles = ({
  title,
  uploadedFiles,
  onUploadFiles,
  inputValue,
  setInputValue,
  onClick,
  onCancel,
  onDelete,
  loading,
}: {
  title: string;
  uploadedFiles: any[];
  onUploadFiles: (file: File[], uploadedFiles: File[]) => void;
  inputValue?: string;
  setInputValue?: (policy: string) => void;
  onClick: () => void;
  onCancel?: () => void;
  onDelete: (fileName: string) => void;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6 bg-[#fff] p-10 rounded-xl">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex font-medium text-3xl">{title}</div>
          <DropZone
            uploadedFiles={uploadedFiles}
            onUploadFiles={onUploadFiles}
          />
        </div>
        <DocumentList
          uploadedFiles={uploadedFiles}
          onDelete={onDelete}
        />
      </div>
      <div className="grid grid-cols-[1fr]">
        <div>
          {title !== "Version Comparison" ? (
            <div className="flex border border-[#D4D4D7] rounded-[4px] w-full">
              <input
                type="text"
                value={inputValue}
                placeholder={
                  title === "Contract Comparison"
                    ? "Prompt"
                    : "Playbook Policies"
                }
                onChange={(e) => setInputValue?.(e.target.value)}
                className="mr-2 px-2 flex-grow-0 outline-none w-full"
              />
              <div className="p-1 flex gap-2">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={loading ? onCancel : onClick}
                  className={`${
                    loading
                      ? "bg-red-500  hover:bg-red-500"
                      : "bg-[#00D3AF] hover:bg-[#00D3AF]"
                  } cursor-pointer gap-1 min-w-0 w-[36px]`}
                >
                  {loading ? (
                    <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                  ) : (
                    <Icons.arrowUpIcon
                      sx={{ fontSize: 20, marginBottom: 0.3 }}
                    />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end p-1 gap-2">
              <Button
                type="submit"
                variant="contained"
                onClick={loading ? onCancel : onClick}
                className={`${
                  loading
                    ? "bg-red-500  hover:bg-red-500"
                    : "bg-[#00D3AF] hover:bg-[#00D3AF]"
                } cursor-pointer gap-1 min-w-0 w-[36px]`}
              >
                {loading ? (
                  <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                ) : (
                  <Icons.arrowUpIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;
