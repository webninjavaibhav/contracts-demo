import Tabs from "../common/Tabs";
import { Button } from "../common/Button";
import Icons from "../common/Icons";
import Loader from "../common/Loader";

async function generatePDF(currentDocumentName: string) {
  const invoice = document.getElementById("pdf-container");
  var opt = {
    margin: 1,
    filename: `${currentDocumentName}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
  };
  if (window && (window as any)?.html2pdf) {
    (window as any)?.html2pdf().from(invoice).set(opt).save();
  }
}

const Summary = ({
  value,
  error,
  loading,
  analyzedFiles,
  handleChange,
}: {
  value: number;
  error: string;
  loading: boolean;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  analyzedFiles: { totalRecords: number; results: any[] };
}) => {
  const tabs = analyzedFiles?.results?.map(
    (doc, index) => `Doc - ${index + 1} : ${doc?.documentName}`
  );
  const currentFile = analyzedFiles?.results?.[value];
  const currentPolicies = currentFile?.policies;
  const currentDocumentName = currentFile?.documentName;

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", "file.pdf"); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="grid grid-rows-[25px_auto] gap-5 p-10 bg-[#fff] rounded-r-lg">
      <div className="flex font-semibold items-center text-2xl">Results</div>
      <div className="flex flex-col justify-between shadow-[0px_4px_20px_0px_#0000001a] rounded-lg p-5">
        {tabs?.length && !loading ? (
          <Tabs tabs={tabs} value={value} onChange={handleChange} />
        ) : null}
        {loading && (
          <div className="grid place-content-center min-h-[50vh]">
            {/* <CircularProgress sx={{ color: "#00D3AF" }} /> */}
            <Loader text={"Creating Summary"} />
          </div>
        )}
        <div className="max-h-[calc(100vh_-_23vh)] overflow-auto pdf-container pb-0">
          <div id="pdf-container">
            {tabs?.length && currentPolicies && !loading ? (
              currentPolicies?.map((e: any, index: number) => {
                return (
                  <div key={index}>
                    <div key={index + e} className="mb-5">
                      <div className="flex flex-col gap-3 bg-[#eef] p-5 rounded-[8px] mb-[20px]">
                        <div className="flex justify-between gap-2">
                          <div className="font-semibold p-2.5">
                            Compliance {index + 1} / {currentPolicies?.length} :
                            <span className="ml-1 font-light">{e?.policy}</span>
                          </div>
                          <span className="items-center ml-2">
                            <Icons.flagIcon
                              sx={{
                                color:
                                  e?.result === "contradicted"
                                    ? "red"
                                    : "white",
                                fontSize: 25,
                                marginBottom: 0.8,
                              }}
                            />
                          </span>
                        </div>

                        <div className={`font-semibold p-2.5`}>
                          Result :
                          <span className="ml-1 font-light">{e?.result}</span>
                        </div>
                        {e?.warnings?.map((warning: any, i: number) => (
                          <div
                            key={i + warning}
                            className="flex flex-col gap-2"
                          >
                            <div className="font-semibold p-2.5">
                              Clause :
                              <span className="ml-1 font-light">
                                {warning?.clause}
                              </span>
                            </div>
                            <div
                              className={`font-semibold  ${
                                warning?.differences &&
                                warning?.differences !== "N/A"
                                  ? "bg-[#fcf8e3]"
                                  : ""
                              } p-2.5`}
                            >
                              Differences :
                              <span className="ml-1 font-light">
                                {warning?.differences
                                  ? warning?.differences
                                  : "N/A"}
                              </span>
                            </div>
                            <div
                              className={`font-semibold ${
                                warning?.risks && warning?.risks !== "N/A"
                                  ? "bg-[#f2dede]"
                                  : ""
                              } p-2.5`}
                            >
                              <div>
                                Risks :
                                <span className="ml-1 font-light">
                                  {warning?.risks ? warning?.risks : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div className="font-semibold p-2.5">
                              <div>
                                Redline :
                                <span className="ml-1 font-light">
                                  {warning?.redLine ? (
                                    <span
                                      className="ml-1 font-light"
                                      dangerouslySetInnerHTML={{
                                        __html: warning?.redLine,
                                      }}
                                    ></span>
                                  ) : (
                                    <span className="ml-3">N/A</span>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`font-semibold ${
                                warning?.revisedClause &&
                                warning?.revisedClause !== "N/A"
                                  ? "bg-[#e8f5e9]"
                                  : ""
                              } p-2.5`}
                            >
                              <div>
                                Revised Clause :
                                <span className="ml-1 font-light">
                                  {warning?.revisedClause
                                    ? warning?.revisedClause
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : !loading && !error ? (
              <div className="text-xl text-[#a5a5ac] grid place-content-center min-h-[70vh] font-light">
                Search Result
              </div>
            ) : null}
          </div>
          {tabs?.length && currentPolicies && !loading ? (
            <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#fff]">
              <Button
                component="label"
                variant="contained"
                className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[200px]"
                onClick={() => generatePDF(currentDocumentName)}
                disabled={loading}
              >
                Download PDF here
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() =>
                  handleDownload(
                    "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf"
                  )
                }
                className={`${"bg-[#00D3AF] hover:bg-[#00D3AF]"} cursor-pointer gap-1 min-w-0 w-[36px]`}
              >
                <Icons.download fontSize="medium" />
              </Button>
            </div>
          ) : null}
          {error ? <div className="text-red-500 text-xl">{error}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default Summary;
