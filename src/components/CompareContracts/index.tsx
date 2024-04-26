import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";

async function generatePDF() {
  const invoice = document.getElementById("compare-contract-container");
  var opt = {
    margin: 1,
    filename: "comparison.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "letter", orientation: "portrait" },
  };
  if (window && (window as any)?.html2pdf) {
    (window as any)?.html2pdf().from(invoice).set(opt).save();
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
    <div className="flex flex-col gap-4 p-10">
      <div className="flex font-semibold text-2xl">Compared Result</div>
      {loading && (
        <div className="grid place-content-center min-h-[70vh]">
          <CircularProgress sx={{ color: "#00D3AF" }} />
        </div>
      )}
      <div className="max-h-[750px] overflow-auto">
        <div id="compare-contract-container">
          {!loading && data?.html ? (
            <div dangerouslySetInnerHTML={{ __html: data?.html }}></div>
          ) : !loading && !error && data?.comparisons?.length ? (
            <div className="text-lg text-red-500">
              Something went wrong, please try again
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-xl text-[#a5a5ac] grid place-content-center min-h-[70vh] font-light">
                Search Result
              </div>
            )
          )}
        </div>
      </div>

      {data?.html && !loading ? (
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

export default CompareContracts;
