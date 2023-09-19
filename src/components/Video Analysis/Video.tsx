import {
  VideoContainer,
  UploadLabel,
  VideoDisplay,
} from '@/styles/VideoStyles';
import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Colors } from '@/styles/colors';
import { Analyze } from '../helpers/AnalysisFunctions';

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
  margin-top: 10px;

  &:hover {
    background-color: ${Colors.Gold}cc;
  }
`;

import VideoTimeline from './VideoTimeline';

export default function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [results, setResults] = useState({});
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
            <input type='file' accept='video/mp4' onChange={handleFileChange} />
          </UploadLabel>
        )}
      </VideoContainer>
      {videoFile && <VideoTimeline videoRef={videoRef} canvasRef={canvasRef} />}
      {videoFile && (
        <AnalyzeButton
          onClick={async (e) => {
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
