import React, { useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";
import { WaveformContianer, Wave, PlayButton } from "../../styles/VideoStyles";
import { VideoContainer } from "@/styles/VideoStyles";

export default function WaveForm() {
    useEffect(() => {
        const videoElement = document.querySelector(
            'video'
        ) as HTMLVideoElement | null;

        if (videoElement) {
            videoElement.addEventListener("loadeddata", () => {
                const ws = WaveSurfer.create({
                    container: "#waveform",
                    waveColor: 'rgb(200, 0, 200)',
                    progressColor: 'rgb(100, 0, 100)',
                    media: videoElement, // Explicitly cast videoElement to HTMLVideoElement
                });
            });
        }
    }, []);

    return (
        <>
            <VideoContainer>
                <video src="/public/lightstest.mp4" controls playsInline></video>
            </VideoContainer>
            <WaveformContianer>
                <Wave id="waveform" />
            </WaveformContianer>
        </>
    );
}
