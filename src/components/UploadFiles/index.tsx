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
    <div className="flex flex-col gap-6 bg-[#fff] p-7 rounded-xl min-h-[600px]">
      <div className="flex font-semibold text-2xl">{title}</div>
      <div className={`grid grid-cols-[auto_0.7fr] gap-5`}>
        <DropZone
          uploadedFiles={uploadedFiles}
          onUploadFiles={onUploadFiles}
        />
        <DocumentList
          uploadedFiles={uploadedFiles}
          onDelete={onDelete}
        />
      </div>
      <div className="grid grid-cols-[1fr]">
        <div>
          {title !== "Version Comparison" ? (
            <div className="flex border-2 border-[#343A40] rounded-[4px] w-full">
              <input
                type="text"
                value={inputValue}
                placeholder={
                  title === "Contract Comparison" ? "Prompt" : "Policies"
                }
                onChange={(e) => setInputValue?.(e.target.value)}
                className="mr-2 px-3 py-1 flex-grow-0 outline-none w-full"
              />
              <div className="p-1 flex gap-2">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={onClick}
                  disabled={loading}
                  className="bg-[#00D3AF]  hover:bg-[#00D3AF] p-2 cursor-pointer flex items-center gap-1 min-w-[100px]"
                >
                  {loading ? (
                    <CircularProgress
                      size={16}
                      sx={{ color: "#00D3AF" }}
                    />
                  ) : (
                    "Submit"
                  )}
                  <Icons.arrowUpIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={onCancel}
                  className="bg-red-500  hover:bg-red-500 p-2 cursor-pointer flex items-center gap-1 min-w-[70px]"
                >
                  Stop
                  <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end p-1 gap-2">
              <Button
                type="submit"
                variant="contained"
                onClick={onClick}
                disabled={loading}
                className="bg-[#00D3AF]  hover:bg-[#00D3AF] p-2 cursor-pointer flex items-center gap-1 min-w-[100px]"
              >
                {loading ? (
                  <CircularProgress
                    size={16}
                    sx={{ color: "#00D3AF" }}
                  />
                ) : (
                  "Submit"
                )}
                <Icons.arrowUpIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={onCancel}
                className="bg-red-500  hover:bg-red-500 p-2 cursor-pointer flex items-center gap-1 min-w-[70px]"
              >
                Stop
                <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;
