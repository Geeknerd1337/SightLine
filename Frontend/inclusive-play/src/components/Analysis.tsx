import LineChart from "./LineChart";
import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

//Example button props
interface AnalysisProps {
  results: any;
}

interface FilteredResultsState {
  luminosity: { id: string; data: any[] }[];
  flashes: { id: string; data: any[] }[];
  bluelight: { id: string; data: any[] }[];
}

export default function Analysis(props: AnalysisProps) {
  let [filteredResults, setFilteredResults] =
    React.useState<FilteredResultsState>({
      luminosity: [{ id: "luminosity", data: [] }],
      bluelight: [{ id: "bluelight", data: [] }],
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
            return { x: i, y: e };
          }),
        },
      ],
      bluelight: [
        {
          id: "bluelight",
          data: props.results?.BLarr?.map((e: any, i: any) => {
            console.log("Blue Light Amount:", e);
            return { x: i, y: e };
          }),
        },
      ],
      flashes: [
        {
          id: "flashes",
          data: props.results?.FlashArray?.map((e: any, i: any) => {
            console.log("Flashes:", e);
            return { x: i, y: e.flashes };
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
                    id: "luminosity",
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

  /*const renderBrightness = () => {
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
  };*/

  const renderBlueLight = () => {
    console.log("DATA: " + filteredResults?.bluelight?.[0]?.data);
    return (
      <div
        className="flex flex-col justify-center items-center border-2 p-4"
        style={{ height: 350 }}
      >
        <LineChart
          data={
            filteredResults?.bluelight?.[0]?.data?.length >= 0
              ? filteredResults?.bluelight
              : [
                  {
                    id: "blue light",
                    data: [],
                  },
                ]
          }
          min={0}
          xAxisName="Time"
          yAxisName="Blue Light"
        />
      </div>
    );
  };

  const renderFlashes = () => {
    const data = filteredResults?.flashes[0]?.data.map(
      (flash: any, index: any) => ({
        id: `Second ${index + 1}`,
        value: flash.y,
      })
    );

    return (
      <div className="flex flex-col justify-center items-center border-2 p-4 h-[350px]">
        <ResponsiveBar
          data={data}
          keys={["value"]}
          indexBy="id"
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: "X Axis",
            legendOffset: 36,
            legendPosition: "middle",
            tickValues: [],
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Y Axis",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          colors={(bar: any) => (bar.value > 3 ? "red" : "green")}
        />
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
        {renderBlueLight()}
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 w-full">
        {renderFlashes()}
      </div>
    </div>
  );
}
