import { TextField, Typography } from "@mui/material";
import React from "react";
import DropZone from "../DropZone";
import DocumentList from "../DocumentList";
import { Button } from "../common/Button";

const UploadedFiles = ({
  title,
  uploadedFiles,
  onUploadFiles,
  policy,
  setPolicy,
  onClick,
  loading,
}: {
  title: string;
  uploadedFiles: any[];
  onUploadFiles: (file: File[], uploadedFiles: File[]) => void;
  policy?: string;
  setPolicy?: (policy: string) => void;
  onClick: () => void;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-[#fff] p-4 rounded-xl">
      <div className="flex font-semibold text-2xl">{title}</div>
      <div className="grid grid-cols-[auto_0.75fr] gap-5">
        <DropZone
          uploadedFiles={uploadedFiles}
          onUploadFiles={onUploadFiles}
        />
        <DocumentList uploadedFiles={uploadedFiles} />
      </div>
      <div
        className={`grid ${
          title === "Contract Analysis"
            ? "grid-cols-[2.5fr_1fr] gap-5"
            : "grid-cols-[1fr]"
        }`}
      >
        <div>
          {title === "Contract Analysis" && (
            <TextField
              fullWidth
              size="small"
              value={policy}
              placeholder="Policies"
              onChange={(e) => setPolicy?.(e.target.value)}
            />
          )}
        </div>
        <Button
          component="label"
          variant="contained"
          className="bg-[#00D3AF] max-h-[40px] hover:bg-[#00D3AF]"
          onClick={onClick}
          disabled={loading}
        >
          <Typography variant="h6">
            {loading ? "Loading..." : "Submit"}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default UploadedFiles;
