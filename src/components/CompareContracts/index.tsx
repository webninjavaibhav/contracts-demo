import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";

async function generatePDF(data: any, compareFor: string) {
  const htmlContent = `<div>
  <div style="font-size: 2rem;">Comparsion Result</div>
  <div>
      <div style="font-weight: bold; color: #55667A; font-size: 1.25rem;">
        Overall Summary
      </div>
      <div style="font-weight: 500; margin-bottom: 0.75rem;">
        ${data?.summary}
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${data?.comparisons
          ?.map(
            (e: any) =>
              `<div style="font-weight: 500;">
            <div style="color: #55667A; font-weight: bold; font-size: 1.25rem;">
              ${e?.heading}
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${
                    e?.[`${compareFor}1`]
                      ? `<div style="display: flex; flex-direction: column;">
                    <div style="font-weight: bold; text-transform: capitalize;">${compareFor} 1 :</div>
                    <div style="padding-left: 0.625rem; list-style-type: disc;">
                      ${e?.[`${compareFor}1`]}
                    </div>
                  </div>`
                      : ""
                  }
                  ${
                    e?.[`${compareFor}2`]
                      ? `<div style="display: flex; flex-direction: column;">
                    <div style="font-weight: bold; text-transform: capitalize;">${compareFor} 2 :</div>
                    <div style="padding-left: 0.625rem; list-style-type: disc;">
                      ${e?.[`${compareFor}2`]}
                    </div>
                  </div>`
                      : ""
                  }
                  ${
                    e?.summary
                      ? `<div style="display: flex; flex-direction: column;">
                    <div style="font-weight: bold;">Summary :</div>
                    <div style="padding-left: 0.625rem; list-style-type: disc;">
                      ${e?.summary}
                    </div>
                  </div>`
                      : ""
                  }
                </div>
            </div>
          </div>`
          )
          .join("</br>")}
      </div>
    </div>
</div>
`;

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
    a.download = `comparison.pdf`;
    a.click();
    a.remove();
  } catch (err) {
    console.log(err);
  }
}

const CompareContracts = ({
  loading,
  error,
  data,
  compareFor,
}: {
  loading: boolean;
  error: string;
  data: { summary?: number; comparisons: any[]; html?: string };
  compareFor: string;
}) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex font-semibold text-2xl">Compared Result</div>
      {loading && (
        <div className="flex items-center justify-center">
          <CircularProgress sx={{ color: "#00D3AF" }} />
        </div>
      )}
      {data?.html ? (
        <div dangerouslySetInnerHTML={{ __html: data?.html }}></div>
      ) : !loading && !error ? (
        <div className="font-light">
          Please add some files to summarize data
        </div>
      ) : null}
      {data?.comparisons?.length && !loading ? (
        <Button
          component="label"
          variant="contained"
          className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[25%]"
          onClick={() => generatePDF(data, compareFor)}
          disabled={loading}
        >
          Download PDF
        </Button>
      ) : null}
      {error ? <div className="text-red-500 text-xl">{error}</div> : null}
    </div>
  );
};

export default CompareContracts;
