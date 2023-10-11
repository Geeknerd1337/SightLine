/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  VideoContainer,
  UploadLabel,
  VideoDisplay,
  UploadButton,
} from '@/styles/VideoStyles';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Colors } from '@/styles/colors';
import { Analyze } from '../helpers/AnalysisFunctions';
import { Warning, Results } from '../helpers/AnalysisFunctions';
import VideoTimeline from './VideoTimeline';

const hideNativeUploadButton = css({
  display: 'none',
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

const WarningContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;

  .warning {
    font-size: 1.5em;
    color: white;
  }
`;

const WarningModal = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 40%;
  background: linear-gradient(
    196deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  flex-direction: column;
  padding: 10px;

  .warningTitle {
    font-size: 1.4em;
    color: white;
  }

  .warningText {
    font-size: 1em;
    color: white;
  }
`;

export default function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [warnings, setWarnings] = useState<Results | null>(null);
  const [fps, setFps] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const dummyResults: Results = {
    flashWarning: [
      { startTime: 1, endTime: 2 },
      { startTime: 4, endTime: 5 },
    ],
    blueLightWarning: [
      { startTime: 0.5, endTime: 1.2 },
      { startTime: 3.5, endTime: 4 },
    ],
    contrastWarning: [
      { startTime: 2.25, endTime: 3 },
      { startTime: 4, endTime: 4.25 },
    ],
  };

  const setWillReadFrequently = () => {
    if (canvasRef.current) {
      canvasRef.current.setAttribute('willReadFrequently', 'true');
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
      console.log('HMM');
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
      videoRef.current.addEventListener('timeupdate', handleVideoUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleVideoUpdate);
      }
    };
  }, [results, videoRef.current]);

  return (
    <>
      <VideoContainer onDrop={handleDrop} onDragOver={handleDragOver}>
        {videoFile ? (
          <>
            <VideoDisplay ref={videoRef}>
              <source src={URL.createObjectURL(videoFile)} type='video/mp4' />
            </VideoDisplay>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        ) : (
          <UploadLabel>
            Drag and drop a video file here, or click to select a file to
            upload.
            <UploadButton onClick={handleClick}>File Upload</UploadButton>
            <input
              css={hideNativeUploadButton}
              ref={hiddenFileInput}
              type='file'
              accept='video/mp4'
              onChange={handleFileChange}
            />
          </UploadLabel>
        )}
        <WarningContainer>
          {warnings && warnings.flashWarning.length > 0 && (
            <div className='warning'>Flash Warning</div>
          )}
          {warnings && warnings.blueLightWarning.length > 0 && (
            <div className='warning'>Blue Light Warning</div>
          )}
          {warnings && warnings.contrastWarning.length > 0 && (
            <div className='warning'>Luminance Warning</div>
          )}
        </WarningContainer>
        <WarningModal>
          <div className='warningTitle'>Warning</div>
          <div className='warningText'>
            A bit of text explaining the warning
          </div>
        </WarningModal>
      </VideoContainer>
      {videoFile && (
        <VideoTimeline
          videoRef={videoRef}
          canvasRef={canvasRef}
          results={results}
          setWarnings={setWarnings}
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
