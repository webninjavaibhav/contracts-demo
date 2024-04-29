import Tabs from "../common/Tabs";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";
import Icons from "../common/Icons";

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

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex font-semibold text-2xl">Summary Analysis</div>
      {tabs?.length && !loading ? (
        <Tabs
          tabs={tabs}
          value={value}
          onChange={handleChange}
        />
      ) : null}
      {loading && (
        <div className="grid place-content-center min-h-[50vh]">
          <CircularProgress sx={{ color: "#00D3AF" }} />
        </div>
      )}
      <div className="max-h-[calc(100vh_-_25vh)] overflow-auto pdf-container">
        <div id="pdf-container">
          {tabs?.length && currentPolicies && !loading ? (
            currentPolicies?.map((e: any, index: number) => {
              return (
                <>
                  <div
                    key={index + e}
                    className="mb-5"
                  >
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
                                e?.result === "contradicted" ? "red" : "white",
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
                </>
              );
            })
          ) : !loading && !error ? (
            <div className="text-xl text-[#a5a5ac] grid place-content-center min-h-[70vh] font-light">
              Search Result
            </div>
          ) : null}
        </div>
        {tabs?.length && currentPolicies && !loading ? (
          <div className="flex gap-4 mt-5 py-5 m-0 sticky bottom-[-20px] bg-[#fff]">
            <Button
              component="label"
              variant="contained"
              className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[200px]"
              onClick={() => generatePDF(currentDocumentName)}
              disabled={loading}
            >
              Download PDF
            </Button>
          </div>
        ) : null}
        {error ? <div className="text-red-500 text-xl">{error}</div> : null}
      </div>
    </div>
  );
};

export default Summary;
