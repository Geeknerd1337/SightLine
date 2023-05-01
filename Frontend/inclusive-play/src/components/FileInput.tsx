/** @format */
import React, { ReactNode } from "react";
import RoundedCard from "./RoundedCard";
import { ANALYSIS_STATE } from "@/views/HomeView";

//Example button props
interface FileUploadButtonProps {
  state: number;
  setState: (state: number) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleUpload?: (e: any) => void;
  children?: ReactNode;
}

export default function FileUploadButton(props: FileUploadButtonProps) {
  const [fileName, setFileName] = React.useState("");

  const uploadWrapper = (e: any) => {
    props.setState(ANALYSIS_STATE.LOADING);
    setFileName(e?.target?.files?.[0]?.name);
    console.log(e?.target?.files?.[0]?.name);
    if (props?.handleUpload) props.handleUpload(e);
  };

  const getHeader = () => {
    // switch (props.state) {
    //   case ANALYSIS_STATE.INITIAL:
    //     return (
    //       <div className="flex flex-row justify-between border-2">
    //         <input
    //           type="file"
    //           accept="video/*"
    //           onChange={(e) => uploadWrapper(e)}
    //         />
    //       </div>
    //     );
    //     break;
    //   case ANALYSIS_STATE.LOADING:
    //     return (
    //       <div className="flex flex-row justify-around">
    //         {fileName}
    //         <RoundedCard className="bg-slate-400">{"Loading..."}</RoundedCard>
    //       </div>
    //     );
    //   default:
    //     return <></>;
    // }
    return (
      <div className="w-full p-4 h-16">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => uploadWrapper(e)}
          hidden={props.state !== ANALYSIS_STATE.INITIAL}
        />
        <div hidden={props.state !== ANALYSIS_STATE.LOADING}>
          {"Analyzing . . . "}
        </div>
        <div hidden={props.state !== ANALYSIS_STATE.LOADED}>
          {
            "Analyzed! Preview video below or display results through the Results button."
          }
        </div>
      </div>
    );
  };

  const getBody = () => {
    return (
      <div
        className="flex overflow-auto items-center justify-center rounded-md p-4 border-2 drop-shadow-md bg-gray-200"
        style={{ height: "58vh", width: "50vw" }}
        hidden={props.state == ANALYSIS_STATE.INITIAL}
      >
        <video
          ref={props.videoRef}
          controls={props.state == ANALYSIS_STATE.LOADED}
          hidden={props.state == ANALYSIS_STATE.INITIAL}
        >
          <source src="" type="video/mp4" />
        </video>
      </div>
    );
  };

  return (
    <div className="flex flex-1 text-2xl flex-col overflow-hidden items-center">
      <div className="flex overflow-hidden">{getHeader()}</div>
      <div className="h-100 overflow-hidden">{getBody()}</div>
    </div>
  );
}
