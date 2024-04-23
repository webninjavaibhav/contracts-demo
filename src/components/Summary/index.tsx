import Tabs from "../common/Tabs";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";
import Icons from "../common/Icons";

async function generatePDF(currentPolicies: any, currentDocumentName: string) {
  const htmlContentData = `<style>html { -webkit-print-color-adjust: exact;}</style><div style="line-height:1.5; font-size:14.5px;">
  <div style="font-size: 2rem;">Summarized Result</div>
  ${currentPolicies
    ?.map(
      (e: any, index: number) =>
        `<div
        key=${"policy-" + index}
        style="margin-bottom: 1.25rem;"
      >
        <div style="display: flex; flex-direction: column; gap: 0.75rem; background-color: #eef; padding: 1.25rem; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; gap: 0.5rem;">
            <div style="font-weight: bold; padding: 0.625rem;">
              Compliance ${index + 1} / ${currentPolicies?.length} :
              <span style="margin-left: 0.25rem; font-weight: 100;">
                ${e?.policy}
              </span>
            </div>
          </div>
          <div
            style='background-color: ${
              e?.result === "contradicted" ? "#e8f5e9" : "#f2dede"
            }; font-weight: bold; padding: 0.625rem;'
          >
            Result :
            <span style="margin-left: 0.25rem; font-weight: 100;">
              ${e?.result}
            </span>
          </div>
          ${e?.warnings?.map(
            (warning: any, i: number) =>
              `<div
              key=${"warning-" + i}
              style="display: flex; flex-direction: column; gap: 0.5rem;"
            >
              <div style="font-weight: bold; background-color: #d9edf7; padding: 0.625rem;">
                Clause :
                <span style="margin-left: 0.25rem; font-weight: 100;">
                  ${warning?.clause}
                </span>
              </div>
              <div style="font-weight: bold; background-color: #fcf8e3; padding: 0.625rem;">
                Differences :
                <span style="margin-left: 0.25rem; font-weight: 100;">
                  ${warning?.differences}
                </span>
              </div>
              <div style="font-weight: bold; background-color: #f2dede; padding: 0.625rem;">
                Risks :
                <span style="margin-left: 0.25rem; font-weight: 100;">
                  ${warning?.risks}
                </span>
              </div>
              <div style="font-weight: bold; background-color: #fcf8e3; padding: 0.625rem;">
                Redline :
                <span style="margin-left: 0.25rem; font-weight: 100;">
                  ${
                    warning?.redLine
                      ? warning?.redLine
                      : `<span style="margin-left: 0.375rem;">N/A</span>`
                  }
                </span>
              </div>
              <div style="font-weight: bold; background-color: #e8f5e9; padding: 0.625rem;">
                Revised Clause :
                <span style="margin-left: 0.25rem; font-weight: 100;">
                  ${warning?.revisedClause}
                </span>
              </div>
            </div>`
          )}
        </div>
      </div>`
    )
    .join("</br>")}
</div>
`;

  if (typeof document === "undefined") return;
  try {
    const response = await fetch("api/generated-pdf", {
      method: "POST",
      body: JSON.stringify(`${htmlContentData}`),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentDocumentName}.pdf`;
    a.click();
    a.remove();
  } catch (err) {
    console.log(err);
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
    <div className="flex flex-col gap-4 p-5">
      <div className="flex font-semibold text-2xl">
        Contract Summary Analysis
      </div>
      {tabs?.length ? (
        <Tabs
          tabs={tabs}
          value={value}
          onChange={handleChange}
        />
      ) : null}
      {loading && (
        <div className="flex items-center justify-center">
          <CircularProgress sx={{ color: "#00D3AF" }} />
        </div>
      )}
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
                            warning?.differences ? "bg-[#fcf8e3]" : ""
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
                            warning?.risks ? "bg-[#f2dede]" : ""
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
                            warning?.revisedClause ? "bg-[#e8f5e9]" : ""
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
          <div className="font-light">
            Please add some files to summarize data
          </div>
        ) : null}
      </div>
      {tabs?.length && currentPolicies && !loading ? (
        <Button
          component="label"
          variant="contained"
          className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[25%]"
          onClick={() => generatePDF(currentPolicies, currentDocumentName)}
          disabled={loading}
        >
          Download PDF
        </Button>
      ) : null}
      {error ? <div className="text-red-500 text-xl">{error}</div> : null}
    </div>
  );
};

export default Summary;
