import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";

async function generatePDF() {
  const invoice = document.getElementById("compare-version-container");
  var opt = {
    margin: 1,
    filename: `comparison.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
  };
  if (window && (window as any)?.html2pdf) {
    (window as any)?.html2pdf().from(invoice).set(opt).save();
  }
}

const CompareVersion = ({
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
    <div className="flex flex-col gap-4 p-10">
      <div className="flex font-semibold text-2xl">Compared Result</div>
      {loading && (
        <div className="grid place-content-center min-h-[70vh]">
          <CircularProgress sx={{ color: "#00D3AF" }} />
        </div>
      )}
      <div className="max-h-[750px] overflow-auto">
        <div id="compare-version-container">
          {data?.comparisons?.length && !loading ? (
            <div>
              <div className="font-bold text-slate-400 text-lg">
                Overall Summary
              </div>
              <div className="font-medium mb-4 ">{data?.summary}</div>
              <div className="flex flex-col gap-4">
                {data?.comparisons?.map((e: any, index: number) => (
                  <div
                    className="font-medium"
                    key={index + e}
                  >
                    <div className="text-slate-400 text-lg font-bold">
                      {e?.heading}
                    </div>
                    <div className="flex flex-col gap-3">
                      {e?.[`${compareFor}1`] ? (
                        <div className="flex flex-col">
                          <div className="font-bold capitalize">
                            {compareFor} 1 :
                          </div>
                          <div className="pl-5 list-disc">
                            {e?.[`${compareFor}1`]}
                          </div>
                        </div>
                      ) : null}
                      {e?.[`${compareFor}2`] ? (
                        <div className="flex flex-col">
                          <div className="font-bold capitalize">
                            {compareFor} 2 :
                          </div>
                          <div className="pl-5 list-disc">
                            {e?.[`${compareFor}2`]}
                          </div>
                        </div>
                      ) : null}
                      {e?.summary ? (
                        <div className="flex flex-col">
                          <div className="font-bold">Summary : </div>
                          <div className="pl-5 list-disc">{e?.summary}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : !loading && !error ? (
            <div className="text-xl text-[#a5a5ac] grid place-content-center min-h-[70vh] font-light">
              Search Result
            </div>
          ) : null}
        </div>
      </div>
      {data?.comparisons?.length && !loading ? (
        <Button
          component="label"
          variant="contained"
          className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[25%]"
          onClick={generatePDF}
          disabled={loading}
        >
          Download PDF
        </Button>
      ) : null}
      {error ? <div className="text-red-500 text-xl">{error}</div> : null}
    </div>
  );
};

export default CompareVersion;
