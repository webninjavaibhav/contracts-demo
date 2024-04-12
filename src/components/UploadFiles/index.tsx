import { Typography } from "@mui/material";
import React from "react";
import DropZone from "../DropZone";
import DocumentList from "../DocumentList";

const UploadedFiles = ({
  title,
  uploadedFiles,
  onUploadFiles,
}: {
  title: string;
  uploadedFiles: any[];
  onUploadFiles: (file: File[], uploadedFiles: File[]) => void;
}) => {
  return (
    <>
      <Typography
        variant="h5"
        className="flex p-10 font-semibold "
      >
        {title}
      </Typography>
      <div className="grid grid-cols-2 px-10 gap-5">
        <DropZone
          uploadedFiles={uploadedFiles}
          onUploadFiles={onUploadFiles}
        />
        <DocumentList uploadedFiles={uploadedFiles} />
      </div>
    </>
  );
};

export default UploadedFiles;
