import { VideoContainer, UploadLabel } from "@/styles/VideoStyles";

export default function Video() {
  return (
    <>
      <VideoContainer>
        <UploadLabel>
          Drag and drop a video file here, or click to select a file to upload.
        </UploadLabel>
      </VideoContainer>
    </>
  );
}
