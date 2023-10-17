import styled from '@emotion/styled';
import { Colors } from './colors';

//Video container
export const VideoContainer = styled.div`
    width: 60%;
    background-color: ${Colors.Gray};
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
`;

export const UploadLabel = styled.div`
    position: absolute;
    color: ${Colors.Text};
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const UploadButton = styled.button`
  cursor: pointer;
  border: none;
  font: inherit;
  min-height: 48px;
  min-width: 48px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  background-color: ${Colors.Gold};
  color: ${Colors.DarkGray};
  transition: 0.2s ease-in-out;
  font-weight: 600;

  &:hover {
    background-color: ${Colors.Gold}cc;
  }
`;

export const VideoDisplay = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const VideoTimelineBackground = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${Colors.DarkGray};
    width: 60%;
    position: relative;
    border: 1px solid ${Colors.DarkBack};
    box-shadow: 2px 2px 10px 0px ${Colors.DarkBack};

    & > .waveformContainer{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    & > .warningContainer{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;

        
        
        & > .warningRow{
          position: relative;
          height: 33%;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          & .warning{
            z-index: 2;
            opacity: 0.8;
            border: none;

            &:hover{
              border: 2px solid yellow;
              cursor: pointer;
            }
          }
        }
    }
`;

export const VideoTimelineSeeker = styled.div`
    height: 100%;
    width: 2px;
    background-color: ${Colors.Gold};
    position: absolute;
    top: 0px;
    z-index: 2;
    left: 0px;
    opacity: 0;
`;

//Video wvaeform canvas
export const VideoWaveform = styled.canvas`
    width: 100%;
    height: 80px;
    position: absolute;
    top: 0px;
    left: 0px;
`;

//WaveForm.js styles
export const WaveformContianer = styled.div`
  display: flex;  
  flex-direction: row;  
  align-items: center;
  justify-content: center;
  height: 100px;  
  width: 60%;
  background: transparent;
  z-index: 1;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  
`


export const Wave = styled.div`
  width: 100%;
  height: 90px;
  
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 57px;
  height: 52px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  margin-right: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background: #DDDD;
  }
`;
