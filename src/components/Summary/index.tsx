import Tabs from "../common/Tabs";
import { Divider, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";
import Icons from "../common/Icons";

async function generatePDF(currentPolicies: any, currentDocumentName: string) {
  const htmlContentData = `<style>html { -webkit-print-color-adjust: exact;}</style><div style="line-height:1.5; font-size:16px;">
  <div style="font-size: 2rem;">Summarized Result</div>
 ${currentPolicies
   ?.map((e: any, index: number) => {
     return `<div
   key=${"policy-" + index}
   style="margin-bottom: 1.25rem;"
 >
   <div style="display: flex; flex-direction: column; gap: 0.75rem;">
     <div style="display: flex; flex-direction: column; font-size: 1rem; padding: 1rem 0.5rem; background-color: #ebecfe; gap: 0.5rem; border-left: 0.25rem solid #44a0f4;">
       <div style="font-size: 1.25rem;">Policy Analysis</div>
       <div style="display: flex; flex-direction: column; gap: 0.25rem;">
         <div>
           <div style="font-weight: bold;">
             Policy ${index + 1} of ${
       currentPolicies?.length
     } : <span style="font-weight: 100;">
             ${e?.policy}
           </span>
           </div>
         </div>
         <div
           style="color : ${e?.result === "entailed" ? "green" : "red"}"
         >
           <div style="font-weight: bold;">Result : <span style="text-transform: capitalize;">
           ${e?.result}
         </span></div>
         </div>
       </div>
     </div>
     ${e?.warnings?.map(
       (warning: any, i: number) =>
         `<div
         key={warning + i}
         style="display: flex; flex-direction: column; gap: 0.75rem;"
       >
         <div style="display: flex; flex-direction: column; font-size: 1rem; padding: 1rem 0.5rem; background-color: #ebecfe; gap: 0.5rem; border-left: 0.25rem solid #44a0f4;">
           <div style="font-size: 1.25rem;">Clause Detail</div>
           <div style="display: flex; flex-direction: column; gap: 0.25rem;">
             <div style="font-weight: bold;">
               Policy ${index + 1} : Warning ${i + 1} of ${e?.warnings?.length}
             </div>
             <div>
               <div style="font-weight: bold;">Original Clause : <span style="font-weight: 100;">${
                 warning?.clause
               }</span></div>
             </div>
             <div style="border-left: 0.25rem solid #fb8a02; background-color: #e8f5e9; padding-left: 0.5rem;">
               <div style="font-weight: bold;">Differences : 
               <span style="font-weight: 100;">${warning?.differences}</span>
               </div>
             </div>
             <div style="color: red; font-weight: bold;">
               <div>Risks : 
               <span>${warning?.risks}</span>
               </div>
             </div>
           </div>
         </div>
         <div style="display: flex; flex-direction: column; font-size: 1rem; padding: 1rem 0.5rem; background-color: #ebecfe; gap: 0.5rem; border-left: 0.25rem solid #44a0f4;">
           <div style="font-size: 1.25rem;">Redline Comparison</div>
           <div>
               <div style="font-weight: bold;">Redline Text : 
               <span>${warning?.redLine}</span>
               </div>
             </div>
         </div>
         <div style="display: flex; flex-direction: column; font-size: 1rem; padding: 1rem 0.5rem; background-color: #e8f5e9; gap: 0.5rem; border-left: 0.25rem solid #47ae4b;">
           <div style="font-size: 1.25rem;">Revised Clauses</div>
           <div>${warning?.revisedClause}</div>
         </div>
       </div>`
     )}
   </div>
 </div>`;
   })
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
          <CircularProgress color="success" />
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
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col text-sm px-2 py-5 bg-[#ebecfe] gap-3 border-l-4 border-l-[#44a0f4]">
                      <div className="text-xl">
                        Policy Analysis
                        {(e?.policy || e?.result) && (
                          <span className="items-center ml-2">
                            {
                              <Icons.flagIcon
                                sx={{
                                  color: "red",
                                  fontSize: 25,
                                  marginBottom: 0.8,
                                }}
                              />
                            }
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="font-semibold">
                          Policy {index + 1} of {currentPolicies?.length} :{" "}
                          <span className="ml-1 font-light">{e?.policy}</span>
                        </div>
                        <div
                          className={`${
                            e?.result === "entailed"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          <div className="font-semibold">
                            Result :
                            <span className={`ml-1 capitalize`}>
                              {e?.result}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {e?.warnings?.map((warning: any, i: number) => (
                      <div
                        key={i + warning}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col text-sm px-2 py-5 bg-[#ebecfe] gap-3 border-l-4 border-l-[#44a0f4]">
                          <div className="text-xl">
                            Clause Detail
                            {(warning?.clause ||
                              warning?.differences ||
                              warning?.risks) && (
                              <span className="items-center ml-2">
                                {
                                  <Icons.flagIcon
                                    sx={{
                                      color: "red",
                                      fontSize: 25,
                                      marginBottom: 0.8,
                                    }}
                                  />
                                }
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold">
                              Policy {index + 1} : Warning {i + 1} of{" "}
                              {e?.warnings?.length}
                            </div>
                            <div className="font-semibold">
                              Original Clause :
                              <span className="ml-1 font-light">
                                {warning?.clause}
                              </span>
                            </div>
                            <div className="border-l-4 border-l-[#fb8a02] bg-[#e8f5e9] pl-2">
                              <div className="font-semibold">
                                Differences :
                                <span className="ml-1 font-light">
                                  {warning?.differences}
                                </span>
                              </div>
                            </div>
                            <div className="text-red-500 font-semibold">
                              <div>
                                Risks :
                                <span className="ml-1">{warning?.risks}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col text-sm px-2 py-5 bg-[#ebecfe] gap-3 border-l-4 border-l-[#44a0f4]">
                          <div className="text-xl">
                            Redline Comparison
                            {warning?.redLine && (
                              <span className="items-center ml-2">
                                {
                                  <Icons.flagIcon
                                    sx={{
                                      color: "red",
                                      fontSize: 25,
                                      marginBottom: 0.8,
                                    }}
                                  />
                                }
                              </span>
                            )}
                          </div>
                          <div className="font-semibold">
                            Redline Text :
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
                          </div>
                        </div>
                        <div className="flex flex-col text-sm px-2 py-5 bg-[#e8f5e9] gap-3 border-l-4 border-l-[#47ae4b]">
                          <div className="text-xl">
                            Revised Clauses
                            {warning?.revisedClause && (
                              <span className="items-center ml-2">
                                {
                                  <Icons.flagIcon
                                    sx={{
                                      color: "red",
                                      fontSize: 25,
                                      marginBottom: 0.8,
                                    }}
                                  />
                                }
                              </span>
                            )}
                          </div>
                          <div>{warning?.revisedClause ?? "N/A"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {currentPolicies.length !== index + 1 && (
                  <Divider className="my-5 bg-black border-2 border-black" />
                )}
              </>
            );
          })
        ) : !loading ? (
          <div className="font-light">
            Please add some files to summarize data
          </div>
        ) : null}
      </div>
      {tabs?.length && currentPolicies && !loading ? (
        <Button
          component="label"
          variant="contained"
          className="bg-[#68BA82] hover:bg-[#68BA82] w-[25%]"
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
