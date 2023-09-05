import React, { Component } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";

import { WaveformContianer, Wave, PlayButton } from "../../styles/VideoStyles";

//need to change to a functional component
class WaveForm extends Component {
  state = {
    playing: false,
  };

  waveform: any;

  componentDidMount() {
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      height: 80,
      progressColor: "#2D5BFF",
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      url: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
    });
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

    return (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? <FaPlay /> : <FaPause />}
        </PlayButton>
        <Wave id="waveform" />
        <audio id="track" src={url} />
      </WaveformContianer>
    );
  }
}

export default WaveForm;
