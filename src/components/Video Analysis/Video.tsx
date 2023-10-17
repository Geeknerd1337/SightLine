/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  VideoContainer,
  UploadLabel,
  VideoDisplay,
  UploadButton,
} from "@/styles/VideoStyles";
import { WarningContainer, WarningModal } from "@/styles/ModalStyles";
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Colors } from "@/styles/colors";
import { Analyze } from "../helpers/AnalysisFunctions";
import { Warning, Results } from "../helpers/AnalysisFunctions";
import VideoTimeline from "./VideoTimeline";

const hideNativeUploadButton = css({
  display: "none",
});

const AnalyzeButton = styled.button`
  background-color: ${Colors.Gold};
  color: ${Colors.DarkGray};
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 15px;

  &:hover {
    background-color: ${Colors.Gold}cc;
  }
`;

//Modal content interface
export interface ModalContent {
  title: string;
  text: string;
}

const LightModalContent: ModalContent = {
  title: "Light Warning",
  text: "This portion of the video contains flashing lights which can be cause seizures in those suffering from eplipsy. Be sure to include a warnings that flashing lights may be present or consider adding a setting to disable them entirely.",
};

const BlueModalContent: ModalContent = {
  title: "Blue Light Warning",
  text: "This portion of the video contains blue light which can cause eye strain and headaches. Be sure to include a warnings that blue light may be present or consider adding a setting to disable them entirely.",
};

const LuminanceModalWarning: ModalContent = {
  title: "Luminance Warning",
  text: "This portion of the video contains a large change in luminance which can cause eye strain and headaches. Be sure to include a warnings that luminance changes may be present or consider adding a setting to disable them entirely.",
};

export default function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [warnings, setWarnings] = useState<Results | null>(null);
  const [fps, setFps] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const setWillReadFrequently = () => {
    if (canvasRef.current) {
      canvasRef.current.setAttribute("willReadFrequently", "true");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setVideoFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setVideoFile(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = (event: any) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(() => {
    const handleVideoUpdate = () => {
      // Get the warnings for the current time
      if (results) {
        const flashWarning = results.flashWarning.filter(
          (warning) =>
            warning.startTime <= videoRef.current!.currentTime &&
            warning.endTime >= videoRef.current!.currentTime
        );

        const contrastWarnings = results.contrastWarning.filter(
          (warning) =>
            warning.startTime <= videoRef.current!.currentTime &&
            warning.endTime >= videoRef.current!.currentTime
        );

        const blueLightWarnings = results.blueLightWarning.filter(
          (warning) =>
            warning.startTime <= videoRef.current!.currentTime &&
            warning.endTime >= videoRef.current!.currentTime
        );

        // Set the warnings as a results object
        const warnings: Results = {
          flashWarning,
          contrastWarning: contrastWarnings,
          blueLightWarning: blueLightWarnings,
        };

        // Set the warnings
        setWarnings(warnings);

        console.log(warnings);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleVideoUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleVideoUpdate);
      }
    };
  }, [results]);

  return (
    <>
      <VideoContainer onDrop={handleDrop} onDragOver={handleDragOver}>
        {videoFile ? (
          <>
            <VideoDisplay ref={videoRef}>
              <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
            </VideoDisplay>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        ) : (
          <UploadLabel>
            Drag and drop a video file here, or click to select a file to
            upload.
            <UploadButton onClick={handleClick}>File Upload</UploadButton>
            <input
              css={hideNativeUploadButton}
              ref={hiddenFileInput}
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
            />
          </UploadLabel>
        )}
        <WarningContainer>
          {warnings && warnings.flashWarning.length > 0 && (
            <button
              className="warning"
              onClick={() => {
                setModalOpen(true);
                setModalContent(LightModalContent);
              }}
            >
              Flash Warning
            </button>
          )}
          {warnings && warnings.blueLightWarning.length > 0 && (
            <div
              className="warning"
              onClick={() => {
                setModalOpen(true);
                setModalContent(BlueModalContent);
              }}
            >
              Blue Light Warning
            </div>
          )}
          {warnings && warnings.contrastWarning.length > 0 && (
            <div
              className="warning"
              onClick={() => {
                setModalOpen(true);
                setModalContent(LuminanceModalWarning);
              }}
            >
              Luminance Warning
            </div>
          )}
        </WarningContainer>
        {modalOpen && (
          <WarningModal>
            {modalContent && (
              <div className="textHolder">
                <div className="warningTitle">{modalContent.title}</div>
                <div className="warningText">{modalContent.text}</div>

                <button
                  className="exit"
                  onClick={() => {
                    setModalOpen(false);
                    setModalContent(null);
                  }}
                >
                  X
                </button>
              </div>
            )}
          </WarningModal>
        )}
      </VideoContainer>
      {videoFile && (
        <VideoTimeline
          videoRef={videoRef}
          canvasRef={canvasRef}
          results={results}
          setWarnings={setWarnings}
          setModalOpen={setModalOpen}
          setModalContent={setModalContent}
        />
      )}
      {videoFile && (
        <AnalyzeButton
          onClick={async (e) => {
            setWillReadFrequently();
            await Analyze(videoRef, canvasRef, (e) => {
              setResults(e);
            });
          }}
        >
          Analyze Video
        </AnalyzeButton>
      )}
    </>
  );
}
