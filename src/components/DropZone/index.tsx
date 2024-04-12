import { useDropzone } from "react-dropzone";
import { Button } from "../common/Button";
import { Box } from "@mui/material";

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
        className="grid place-content-center justify-center border-2 min-h-[200px] "
      >
        <Box
          className={{
            ...getInputProps(),
          }}
        >
          <Button
            component="label"
            variant="contained"
            className="bg-neutral-700"
          >
            Upload
          </Button>
        </Box>
      </div>
    </>
  );
};

export default DropZone;
