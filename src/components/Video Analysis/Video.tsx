/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BsExclamationCircleFill } from "react-icons/bs";

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
import { Results } from "../helpers/AnalysisFunctions";
import VideoTimeline from "./VideoTimeline";
import {
  FlashModalContent,
  BlueModalContent,
  LuminanceModalContent,
  ModalContent,
} from "../modals/WarningModalComp";
import ThreeDotsWave from "../ThreeDotsWave";

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

const LoadingModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${Colors.DarkGray}cc;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 2rem;
  color: ${Colors.Gold};
`;

const SummaryModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${Colors.DarkGray}cc;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 2rem;

  & .resultsContainer {
    background-color: ${Colors.DarkGray};
    border-radius: 10px;
    //Drop shadow
    box-shadow: 5px 5px 10px 5px ${Colors.Gold}11;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;

    & .title {
      font-size: 2rem;
    }

    & .text {
      font-size: 1.5rem;
    }
  }

  & .exit {
    position: absolute;
    width: 1.1em;
    height: 1.1em;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10%;
    //Bold
    font-weight: 700;
    background-color: ${Colors.Gold};
    color: ${Colors.DarkGray};
    border: none;
  }
`;

const SummaryButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 4px;
  background-color: ${Colors.DarkGray};
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const breakpoints = [992, 576, 460];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

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
  const [analysisState, setAnalysisState] = useState<
    "idle" | "analyzing" | "completed"
  >("idle");

  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <UploadLabel
            css={{
              [mq[0]]: {
                fontSize: "1em",
              },
              [mq[1]]: {
                fontSize: "0.8em",
              },
              [mq[2]]: {
                fontSize: "0.6em",
              },
            }}
          >
            Drag and drop a video file here, or click to select a file to
            upload.
            <UploadButton
              onClick={handleClick}
              css={{
                [mq[0]]: {
                  minHeight: "45px",
                  minWidth: "45px",
                },
                [mq[1]]: {
                  minHeight: "40px",
                  minWidth: "40px",
                },
                [mq[2]]: {
                  minHeight: "30px",
                  minWidth: "30px",
                },
              }}
            >
              File Upload
            </UploadButton>
            <input
              css={hideNativeUploadButton}
              ref={hiddenFileInput}
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
            />
          </UploadLabel>
        )}
        {analysisState === "analyzing" && (
          <LoadingModal>
            <ThreeDotsWave />
          </LoadingModal>
        )}
        <WarningContainer
          css={{
            [mq[0]]: {
              display: "none",
            },
          }}
        >
          {warnings && warnings.flashWarning.length > 0 && (
            <button
              className="warning"
              onClick={() => {
                setModalOpen(true);
                setModalContent(FlashModalContent);
              }}
            >
              <BsExclamationCircleFill />
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
              <BsExclamationCircleFill />
              Blue Light Warning
            </div>
          )}
          {warnings && warnings.contrastWarning.length > 0 && (
            <div
              className="warning"
              onClick={() => {
                setModalOpen(true);
                setModalContent(LuminanceModalContent);
              }}
            >
              <BsExclamationCircleFill />
              Luminance Warning
            </div>
          )}
        </WarningContainer>
        {analysisState === "completed" && (
          <SummaryButton
            onClick={() => {
              setSummaryModalOpen(true);
            }}
          >
            View Summary
          </SummaryButton>
        )}
        {summaryModalOpen && (
          <SummaryModal>
            <button
              className="exit"
              onClick={() => {
                setSummaryModalOpen(false);
              }}
            >
              X
            </button>
            <div className="resultsContainer">
              <div className="title"> Results</div>
              {results && (
                <>
                  <div className="text">
                    Flash Warnings: {results.flashWarning.length}
                  </div>
                  <div className="text">
                    Blue Light Warnings: {results.blueLightWarning.length}
                  </div>
                  <div className="text">
                    Luminance Warnings: {results.contrastWarning.length}
                  </div>
                </>
              )}
            </div>
          </SummaryModal>
        )}

        {modalOpen && (
          <WarningModal
            css={{
              [mq[0]]: {
                width: "100%",
              },
              [mq[1]]: {
                width: "100%",
                fontSize: "0.8em",
              },
              [mq[2]]: {
                width: "100%",
                fontSize: "0.7em",
              },
            }}
          >
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
            setAnalysisState("analyzing");
            await Analyze(videoRef, canvasRef, (e) => {
              setResults(e);
              setAnalysisState("completed");
            });
          }}
        >
          Analyze Video
        </AnalyzeButton>
      )}
    </>
  );
}
