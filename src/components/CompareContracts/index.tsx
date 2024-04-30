import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../common/Button";
import Loader from "../common/Loader";

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
    <div className="grid grid-rows-[25px_auto] gap-5 p-10 bg-[#fff] rounded-r-lg">
      <div className="flex font-semibold items-center text-2xl">Results</div>
      <div className="flex flex-col justify-between shadow-[0px_4px_20px_0px_#0000001a] rounded-lg p-5">
        {loading && (
          <div className="grid place-content-center min-h-[50vh]">
            {/* <CircularProgress sx={{ color: "#00D3AF" }} /> */}
            <Loader text={"Processing Documents"} />
          </div>
        )}
        <div className="max-h-[calc(100vh_-_23vh)] overflow-auto pdf-container p-3 pb-0">
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
          <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#fff]">
            <Button
              component="label"
              variant="contained"
              className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[200px]"
              onClick={generatePDF}
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

export default CompareContracts;
