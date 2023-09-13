import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';
import { WaveformContianer, Wave, PlayButton } from '../../styles/VideoStyles';

function useWaveSurfer(url: string) {
  const waveformRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      height: 80,
      progressColor: '#2D5BFF',
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
      url: url,
    });

    return () => {
      if (waveformRef.current) {
        waveformRef.current.destroy();
      }
    };
  }, [url]);

  return waveformRef;
}

export default function WaveFormTest() {
  const [playing, setPlaying] = useState(false);
  const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
  const waveformRef = useWaveSurfer(url);

  const handlePlay = () => {
    setPlaying(!playing);
    waveformRef.current?.playPause();
  };

  return (
    <WaveformContianer>
      <PlayButton onClick={handlePlay}>
        {!playing ? <FaPlay /> : <FaPause />}
      </PlayButton>
      <Wave id='waveform' />
      <audio id='track' src={url} />
    </WaveformContianer>
  );
}
