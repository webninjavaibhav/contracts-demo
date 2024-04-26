import { useDropzone } from "react-dropzone";
import { Button } from "../common/Button";
import { Box } from "@mui/material";
import uploadIcon from "../../../public/images/upload.png";
import Image from "next/image";
import UploadIcon from "../../../public/images/uploadIcon";

const DropZone = (props: any) => {
  const { uploadedFiles, onUploadFiles } = props;

  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles.length) {
      onUploadFiles(acceptedFiles, uploadedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="grid place-items-center place-content-center border-dashed border-2 border-[#D4D4D7] rounded-lg min-h-[250px] cursor-pointer"
      >
        <Box
          className={{
            ...getInputProps(),
          }}
        >
          <UploadIcon />
        </Box>
        <div className="text-sm  text-center font-medium">
          Drag and Drop your files here or{" "}
          <span className="text-[#00D3AF] text-center">Upload</span>
        </div>
        <div className="text-sm  text-[#92929C] text-center font-medium">
          PDF or Docx , maxiumum size 5MB
        </div>
      </div>
    </>
  );
};

export default DropZone;
