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
        className="grid place-items-center place-content-center gap-8 border-dashed border-4 border-[#00D3AF] rounded-lg min-h-[550px] cursor-pointer"
      >
        <Box
          className={{
            ...getInputProps(),
          }}
        >
          <UploadIcon />
        </Box>
        <div className="text-[26px] tracking-[1.5px] leading-10 text-center font-semibold">
          Drop your files here
          <br />
          or <span className="text-[#00D3AF] text-center">Browse</span>
        </div>
      </div>
    </>
  );
};

export default DropZone;
