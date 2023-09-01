import {
  VideoContainer,
  UploadLabel,
  VideoDisplay,
} from "@/styles/VideoStyles";
import { useState, useRef } from "react";

export default function Video() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
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
              <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
            </VideoDisplay>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        ) : (
          <UploadLabel>
            Drag and drop a video file here, or click to select a file to
            upload.
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </UploadLabel>
        )}
      </VideoContainer>
    </>
  );
}
