import Icons from "../common/Icons";
import GroupIcon from "../../../public/images/Group.png";
import Image from "next/image";

const DocumentList = ({
  uploadedFiles,
  onDelete,
}: {
  uploadedFiles: any;
  onDelete: (fileName: string) => void;
}) => {
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const digitGroups = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, digitGroups)).toFixed(2)} ${
      units[digitGroups]
    }`;
  }

  return (
    <div className="flex flex-col justify-start p-2 min-h-[450px]">
      <div className="flex font-medium gap-3 items-center text-xl">
        Attached Files
        <Image
          src={GroupIcon}
          alt="group-icon"
          width={20}
          height={20}
        />
      </div>
      {uploadedFiles?.length ? (
        <div className="flex flex-col gap-3 mt-1 max-h-[400px] overflow-auto">
          {uploadedFiles?.map((data: any, index: number) => (
            <div
              className="flex gap-5 items-center text-sm"
              key={index}
            >
              <div className="grid grid-cols-[1fr_auto] w-full border border-[#D4D4D7] rounded-lg p-3">
                <div>
                  <div className="text-sm font-medium">{data?.name}</div>
                  <div className="flex items-center gap-1 text-[12px] text-[#5D5C6B]">
                    {formatFileSize(data?.size)}
                    <Icons.dotIcon sx={{ width: 5, height: 5 }} />
                    <div className="text-[#00D3AF]">Completed</div>
                  </div>
                </div>
                <Icons.crossIcon
                  sx={{
                    color: "#5D5C6B",
                    fontSize: 16,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => onDelete(data?.name)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid place-content-center h-full font-medium text-sm">
          No Files Uploaded
        </div>
      )}
    </div>
  );
};

export default DocumentList;
