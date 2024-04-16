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
           style="color : ${e?.result === "entailed" ? "#00D3AF" : "red"}"
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

                    <div
                      className={`font-semibold p-2.5 ${
                        e?.result === "entailed"
                          ? "bg-[#e8f5e9]"
                          : "bg-[#f2dede]"
                      }`}
                    >
                      Result :
                      <span className="ml-1 font-light">{e?.result}</span>
                    </div>
                    {e?.warnings?.map((warning: any, i: number) => (
                      <div
                        key={i + warning}
                        className="flex flex-col gap-2"
                      >
                        <div className="font-semibold bg-[#d9edf7] p-2.5">
                          Clause :
                          <span className="ml-1 font-light">
                            {warning?.clause}
                          </span>
                        </div>
                        <div className="font-semibold bg-[#fcf8e3] p-2.5">
                          Differences :
                          <span className="ml-1 font-light">
                            {warning?.differences}
                          </span>
                        </div>
                        <div className="font-semibold bg-[#f2dede] p-2.5">
                          <div>
                            Risks :
                            <span className="ml-1 font-light">
                              {warning?.risks}
                            </span>
                          </div>
                        </div>
                        <div className="font-semibold bg-[#fcf8e3] p-2.5">
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
                        <div className="font-semibold bg-[#e8f5e9] p-2.5">
                          <div>
                            Revised Clause :
                            <span className="ml-1 font-light">
                              {warning?.revisedClause}
                            </span>
                          </div>
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
          className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[25%]"
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
