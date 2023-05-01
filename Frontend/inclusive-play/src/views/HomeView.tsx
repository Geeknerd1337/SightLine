/** @format */

import { useState, useRef } from "react";
import RoundedCard from "@/components/RoundedCard";
import DropDownButton from "@/components/DropDownButton";
import BarChart from "@/components/BarChart";
import links from "@/links.json";
import { AiOutlineLink } from "react-icons/ai";
import Analysis from "@/components/Analysis";
// import FileUploadButton from "@/components/FileUploadButton"
import FileInput from "@/components/FileInput";
import { Analyze } from "@/components/helpers/AnalysisFunctions";

export const ANALYSIS_STATE = {
  INITIAL: 0,
  LOADING: 1,
  LOADED: 2,
  ANALYZING: 3,
  ANALYZED: 4,
};

// * home page
export default function HomeView() {
  // * display

  // * data
  let [results, setResults] = useState({});
  let [analysisState, setAnalysisState] = useState(ANALYSIS_STATE.INITIAL);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // * data functions

  // * render functions
  const renderSubHeader = () => {
    return <div className="flex-auto" />;
  };

  const renderHelperHeader = (text: String, color?: String) => {
    if (!color) color = "bg-orange-300";
    return (
      <div className="flex pb-4 w-1/4 font-semibold text-2xl justify-items-start flex-row">
        <RoundedCard className={`${color} mr-3 p-2.5 md:filter-none`} />
        {text}
      </div>
    );
  };

  const renderLeftColumn = () => {
    return (
      <div className="flex-auto flex flex-col">
        {/* <DropDownButton></DropDownButton>

				<RoundedCard className="m-3">
					<FileUploadButton endpoint="/api/upload" />
				</RoundedCard> */}
        <RoundedCard className="m-3">
          <div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
            <RoundedCard className="bg-red-300 mr-3 p-2.5 md:filter-none" />
            Links
          </div>

          <ul className="flex flex-col items-start">
            {links.map((link, i) => (
              <div className="flex items-center justify-between p-1" key={i}>
                <AiOutlineLink className="mr-1" />
                <li className="font-semibold text-lg hover:text-purple-400">
                  <a href={link.URL}>{link.title}</a>
                </li>
              </div>
            ))}
          </ul>
        </RoundedCard>
      </div>
    );
  };
  const renderMiddleColumn = () => {
    const renderStatusIndicator = () => {
      let body = <></>;
      switch (analysisState) {
        case ANALYSIS_STATE.INITIAL:
          body = renderHelperHeader("Awaiting Upload...", "bg-red-300");
          break;
        case ANALYSIS_STATE.LOADING:
          body = renderHelperHeader("Analyzing Video...", "bg-orange-300");
          break;
        case ANALYSIS_STATE.LOADED:
          body = renderHelperHeader("Video Analyzed!", "bg-yellow-300");
          break;
        case ANALYSIS_STATE.ANALYZING:
          body = renderHelperHeader("Analyzing...", "bg-green-300");
          break;
        case ANALYSIS_STATE.ANALYZED:
          body = renderHelperHeader("Analysis Results!", "bg-blue-300");
          break;
        default:
      }
      return body;
    };

    const primaryRenderFromState = () => {
      switch (analysisState) {
        case ANALYSIS_STATE.INITIAL:
        case ANALYSIS_STATE.LOADING:
        case ANALYSIS_STATE.LOADED:
          return (
            <>
              <div className="flex flex-1 flex-col text-xl items-center justify-center overflow-hidden">
                <FileInput
                  state={analysisState}
                  setState={setAnalysisState}
                  videoRef={videoRef}
                  handleUpload={(e): any => {
                    Analyze(e, videoRef, canvasRef, (e) => {
                      setResults(e);
                      setAnalysisState(ANALYSIS_STATE.LOADED);
                    });
                  }}
                />
              </div>
            </>
          );
          break;
        case ANALYSIS_STATE.ANALYZING:
          break;
        case ANALYSIS_STATE.ANALYZED:
          return <Analysis results={results} />;
          break;
        default:
      }
      return <></>;
    };

    //Renderbutton props
    interface RenderButtonProps {
      colorIndex: number;
      disabled: boolean;
      onClick: () => void;
      children: any;
    }

    const renderButton = (props: RenderButtonProps) => {
      let color;

      switch (props?.colorIndex) {
        case 1:
          color = "bg-red-500 hover:bg-red-700";
          break;
        case 2:
          color = "bg-orange-500 hover:bg-orange-700";
          break;
        case 3:
          color = "bg-yellow-500 hover:bg-yellow-700";
          break;
        case 4:
          color = "bg-green-500 hover:bg-green-700";
          break;
        case 5:
          color = "bg-blue-500 hover:bg-blue-700";
          break;
        case 6:
          color = "bg-purple-500 hover:bg-purple-700";
          break;
        case 7:
          color = "bg-pink-500 hover:bg-pink-700";
          break;
        default:
          color = "bg-gray-500 hover:bg-gray-700";
          break;
      }

      let className = `${color} disabled:bg-gray-400 text-white font-bold p-2 m-2 rounded`;
      return (
        <button
          className={className}
          disabled={props?.disabled}
          onClick={props?.onClick}
          style={{ marginTop: "-5px" }}
        >
          {props?.children}
        </button>
      );
    };

    const renderButtons = () => {
      return (
        <>
          {renderButton({
            colorIndex: 3,
            onClick: () => setAnalysisState(ANALYSIS_STATE.INITIAL),
            disabled: analysisState < ANALYSIS_STATE.LOADED,
            children: "Upload",
          })}
          {/* {renderButton({
            colorIndex: 4,
            onClick: () => setAnalysisState(ANALYSIS_STATE.LOADED),
            disabled: analysisState <= ANALYSIS_STATE.LOADED,
            children: "Preview",
          })} */}
          {renderButton({
            colorIndex: 4,
            onClick: () => setAnalysisState(ANALYSIS_STATE.ANALYZED),
            disabled: analysisState != ANALYSIS_STATE.LOADED,
            children: "Results",
          })}
          <div />
        </>
      );
    };

    return (
      <>
        <div className="absolute top-36 text-4.5xl font-bold">Dashboard</div>
        {/* hidden canvas for ref */}
        <canvas hidden ref={canvasRef} style={{}} />{" "}
        <RoundedCard flex>
          <div className="flex flex-row justify-between">
            {renderHelperHeader("Analysis")}
            {renderButtons()}
            {renderStatusIndicator()}
          </div>

          <RoundedCard flex className="border items-end">
            <div className="flex overflow-hidden w-full h-full">
              {primaryRenderFromState()}
              {/* <BarChart></BarChart> */}
            </div>
          </RoundedCard>
        </RoundedCard>
      </>
    );
  };
  const renderRightColumn = () => {
    return (
      <>
        <RoundedCard flex>
          <div className="flex pb-4 font-semibold text-2xl justify-items-start flex-row">
            <RoundedCard className="bg-sky-300 mr-3 p-2.5 md:filter-none" />
            Grade Breakdown
          </div>

          <RoundedCard flex className="border">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              sunt odio neque natus at numquam, iusto quibusdam exercitationem
              ex enim asperiores nesciunt temporibus officiis sint magni minima
              cum amet. Quod.
            </p>
          </RoundedCard>
        </RoundedCard>
      </>
    );
  };

  // * primary render
  return (
    <>
      <div className="h-20">{renderSubHeader()}</div>
      <div className="flex-1 flex m-8 gap-6 flex-row text-black">
        <div className="hidden lg:flex flex-col">{renderLeftColumn()}</div>
        <div className="flex-auto flex flex-col grow-2">
          {renderMiddleColumn()}
        </div>
        <div className="w-96 flex flex-col">{renderRightColumn()}</div>
      </div>
    </>
  );
}
