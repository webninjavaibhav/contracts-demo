import { CircularProgress } from "@mui/material";
import React from "react";
import DropZone from "../DropZone";
import DocumentList from "../DocumentList";
import { Button } from "../common/Button";
import Icons from "../common/Icons";
import CustomTextArea from "../common/TextArea";

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
    <div className="grid grid-rows-[0.75fr_1fr_40px] gap-3 bg-[#fff] p-10 rounded-l-lg">
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
      <div className="grid grid-cols-[1fr]">
        {title !== "Version Comparison" ? (
          <div className="flex flex-row relative items-center w-full border border-[#D4D4D7] rounded-[4px]">
            <CustomTextArea
              value={inputValue}
              placeholder={
                title === "Contract Comparison" ? "Prompt" : "Playbook Policies"
              }
              handleInput={(e: React.BaseSyntheticEvent) =>
                setInputValue?.(e?.target?.value)
              }
              style="pr-[50px]"
            />
            <div className="p-1 px-2 bottom-0 right-0 absolute">
              <Button
                type="submit"
                variant="contained"
                onClick={loading ? onCancel : onClick}
                className={`${
                  loading
                    ? "bg-red-500  hover:bg-red-500"
                    : "bg-[#00D3AF] hover:bg-[#00D3AF]"
                } cursor-pointer gap-1 min-w-0 w-[36px] h-[34px]`}
              >
                {loading ? (
                  <Icons.stopIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
                ) : (
                  <Icons.arrowUpIcon sx={{ fontSize: 20, marginBottom: 0.3 }} />
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
  );
};

export default UploadedFiles;
