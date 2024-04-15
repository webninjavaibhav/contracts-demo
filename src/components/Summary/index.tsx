import Tabs from "../common/Tabs";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";

async function generatePDF(currentPolicies: any, currentDocumentName: string) {
  const htmlContent = `<style>html { -webkit-print-color-adjust: exact;}</style><div style="line-height:1.5; font-size:16px;">
  <div style="font-size: 2rem;">Summarized Result</div>
      ${currentPolicies
        ?.map((e: any, index: number) => {
          return `<div style='display: flex; flex-direction: column; padding: 10px; gap: 3px; font-weight: 600;'>
              <div style="color: #4c5564; font-weight: 600;">
                Policy ${index + 1} of ${currentPolicies?.length}
              </div>
              <div style="padding-left: 5px;">${e?.policy}</div>
              ${e?.warnings?.map(
                (warning: any, i: number) =>
                  `<div style="color: #4c5564; font-weight: 600;">
                    Policy ${index + 1} : Waring ${i + 1} of ${
                    e?.warnings?.length
                  }
                  </div>
                  <div style="padding-left: 5px;">
                    <div style="color: #4c5564; font-weight: 600;">Clause</div>
                    <div>${warning?.clause}</div>
                  </div>
                  <div style="padding-left: 5px;">
                    <div style="color: #4c5564; font-weight: 600;">
                      Differences
                    </div>
                    <div>${warning?.differences}</div>
                  </div>
                  <div style="padding-left: 5px;">
                    <div style="color: #4c5564; font-weight: 600;">Risks</div>
                    <div>${warning?.risks}</div>
                  </div>
                  <div style="padding-left: 5px;">
                    <div style="color: #4c5564; font-weight: 600;">Redline</div>
                    <div>
                    ${warning?.redLine}
                    </div>
                  </div>
                  <div style="padding-left: 5px;">
                    <div style="color: #4c5564; font-weight: 600;">
                      Revised Clauses
                    </div>
                    <div>${warning?.revisedClause}</div>
                  </div>`
              )}
            </div>`;
        })
        .join("</br>")}
    </div>`;
  if (typeof document === "undefined") return;
  try {
    const response = await fetch("api/generated-pdf", {
      method: "POST",
      body: JSON.stringify(`${htmlContent}`),
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
  loading,
  analyzedFiles,
  handleChange,
}: {
  value: number;
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
      <Typography
        variant="h5"
        className="flex font-semibold"
      >
        Summary
      </Typography>
      <Tabs
        tabs={tabs}
        value={value}
        onChange={handleChange}
      />
      {loading && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <div id="pdf-container">
        {tabs?.length && currentPolicies && !loading ? (
          currentPolicies?.map((e: any, index: number) => {
            return (
              <div key={index + e}>
                <div className="flex flex-col p-10 gap-3 font-semibold">
                  <div className="text-slate-400 font-semibold">
                    Policy {index + 1} of {currentPolicies?.length}
                  </div>
                  <div className="pl-5">{e?.policy}</div>
                  <div className="text-slate-400 font-semibold">Result</div>
                  <div
                    className={`pl-5 capitalize ${
                      e?.result === "entailed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {e?.result}
                  </div>
                  {e?.warnings?.map((warning: any, i: number) => (
                    <div key={i + warning}>
                      <div className="text-slate-400 font-semibold">
                        Policy {index + 1} : Warning {i + 1} of{" "}
                        {e?.warnings?.length}
                      </div>
                      <div className="pl-5">
                        <div className="text-slate-400 font-semibold">
                          Clause
                        </div>
                        <div>{warning?.clause}</div>
                      </div>
                      <div className="pl-5">
                        <div className="text-slate-400 font-semibold">
                          Differences
                        </div>
                        <div>{warning?.differences}</div>
                      </div>
                      <div className="pl-5">
                        <div className="text-slate-400 font-semibold">
                          Risks
                        </div>
                        <div>{warning?.risks}</div>
                      </div>
                      <div className="pl-5">
                        <div className="text-slate-400 font-semibold">
                          Redline
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: warning?.redLine,
                          }}
                        ></div>
                      </div>
                      <div className="pl-5">
                        <div className="text-slate-400 font-semibold">
                          Revised Clauses
                        </div>
                        <div>{warning?.revisedClause}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : !loading ? (
          <div>Please add some files to summarize data</div>
        ) : null}
      </div>
      {tabs?.length && currentPolicies && !loading ? (
        <Button
          component="label"
          variant="contained"
          className="bg-neutral-700 w-[25%]"
          onClick={() => generatePDF(currentPolicies, currentDocumentName)}
          disabled={loading}
        >
          Download PDF
        </Button>
      ) : null}
    </div>
  );
};

export default Summary;
