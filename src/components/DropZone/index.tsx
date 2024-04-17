import { useDropzone } from "react-dropzone";
import { Button } from "../common/Button";
import { Box } from "@mui/material";
import uploadIcon from "../../../public/images/upload.png";
import Image from "next/image";

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
        className="grid place-content-center justify-center border-dashed border-4 border-[#00D3AF] rounded-lg min-h-[400px] cursor-pointer"
      >
        <Box
          className={{
            ...getInputProps(),
          }}
        >
          <Image
            src={uploadIcon}
            alt="upload-icon"
            width={250}
            height={300}
          />
        </Box>
      </div>
    </>
  );
};

export default DropZone;
