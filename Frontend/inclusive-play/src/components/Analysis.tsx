import LineChart from "./LineChart";
import React from "react";

//Example button props
interface AnalysisProps {
  results: any;
}

interface FilteredResultsState {
  luminosity: { id: string; data: any[] }[];
  flashes: { id: string; data: any[] }[];
}

export default function Analysis(props: AnalysisProps) {
  let [filteredResults, setFilteredResults] =
    React.useState<FilteredResultsState>({
      luminosity: [{ id: "luminosity", data: [] }],
      flashes: [{ id: "flashes", data: [] }],
    });

  React.useEffect(() => {
    console.log("results updated");
    console.log(props.results);
    setFilteredResults({
      luminosity: [
        {
          id: "luminosity",
          data: props.results?.luminanceArr?.map((e: any, i: any) => {
            console.log("LUM:", e);
            return { x: i, y: e };
          }),
        },
      ],
      flashes: [
        {
          id: "flashes",
          data: props.results?.flashArr?.map((e: any, i: any) => {
            console.log("Flash:", e);
            return { x: i, y: e };
          }),
        },
      ],
    });
    // setFilteredResults(props.results);
  }, [props.results]);

  const renderLuminosity = () => {
    return (
      <div
        className="flex flex-col justify-center items-center border-2 p-4"
        style={{ height: 350 }}
      >
        <LineChart
          data={
            filteredResults?.luminosity?.[0]?.data?.length > 0
              ? filteredResults?.luminosity
              : [
                  {
                    id: "flashes",
                    data: [],
                  },
                ]
          }
          xAxisName="Frames"
          yAxisName="Luminance"
        />
      </div>
    );
  };

  const renderBrightness = () => {
    return (
      <div
        className="flex flex-col justify-center items-center border-2 p-4"
        style={{ height: 350 }}
      >
        <LineChart
          data={
            filteredResults?.flashes?.[0]?.data?.length > 0
              ? filteredResults?.flashes
              : [
                  {
                    id: "flashes",
                    data: [],
                  },
                ]
          }
          xAxisName="Time"
          yAxisName="Flashes"
        />
      </div>
    );
  };

  const renderBlueLight = () => {
    return (
      <div className="flex flex-col justify-center items-center border-2 p-4">
        third graph
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div className="flex flex-col justify-center items-center border-2 p-4">
        <div className="flex flex-col text-3xl justify-center items-center">
          {`Final Grade: ${"(unimplemented)"}`}
        </div>
        <div className="flex flex-col text-xl justify-center items-center">
          {`Details: ${"(unimplemented)"}`}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 grid grid-cols-2 gap-4 w-full">
        {renderLuminosity()}
        {renderBrightness()}
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 w-full">
        {renderBlueLight()}
        {renderResults()}
      </div>
    </div>
  );
}
