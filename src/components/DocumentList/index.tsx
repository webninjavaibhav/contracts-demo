import { Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "../common/Button";

const DocumentList = ({ uploadedFiles }: { uploadedFiles: any }) => {
  return (
    <div className="flex flex-col justify-start border-2 p-2">
      <div className="text-xl">List of Documents</div>
      <div className="flex flex-col gap-3 mt-4 max-h-[200px] overflow-auto">
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
