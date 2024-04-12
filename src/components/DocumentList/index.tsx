import { Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "../common/Button";

const DocumentList = ({ uploadedFiles }: { uploadedFiles: any }) => {
  return (
    <div>
      <Typography variant="h5">List of Documents</Typography>
      <div className="flex flex-col gap-3 mt-4">
        {uploadedFiles?.map((data: any, index: number) => (
          <div
            className="flex gap-3"
            key={index}
          >
            <div>
              <AssignmentIcon />
            </div>
            <div>{data?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
