import Icons from "../common/Icons";

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
    <div className="flex flex-col justify-start p-2">
      {uploadedFiles?.length ? (
        <div className="flex flex-col gap-3 mt-4 max-h-[400px] overflow-auto">
          {uploadedFiles?.map((data: any, index: number) => (
            <div
              className="flex gap-5 items-center text-xl p-2"
              key={index}
            >
              <div>
                {data?.name?.includes("pdf") ? (
                  <Icons.pdfIcon sx={{ color: "red", fontSize: 50 }} />
                ) : data?.name?.includes("doc") ? (
                  <Icons.docIcon sx={{ color: "blue", fontSize: 50 }} />
                ) : (
                  <Icons.textIcon sx={{ fontSize: 50 }} />
                )}
              </div>
              <div className="grid grid-cols-[1fr_auto] w-full">
                <div>
                  <div className="font-semibold">{data?.name}</div>
                  <div className="text-sm">{formatFileSize(data?.size)}</div>
                </div>
                <Icons.crossIcon
                  sx={{
                    color: "red",
                    fontSize: 20,
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
        <div className="grid place-content-center h-full font-semibold text-xl">
          No Documents Upload
        </div>
      )}
    </div>
  );
};

export default DocumentList;
