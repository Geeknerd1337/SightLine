import styled from '@emotion/styled';
import { Colors } from '@/styles/colors';
import { Warning } from './helpers/AnalysisFunctions';
import { useState } from 'react';
interface WarningButtonProps {
  warning: Warning;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Background = styled.button`
  z-index: 2;
  opacity: 1;
  border: none;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &:hover {
    border: 2px solid yellow;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 0px;

  background-color: ${Colors.Gold};
  padding: 10px;
  transform: translateX(-50%) translateY(-110%);
  opacity: 1;
  border: 1px solid white;
  box-shadow: 2px 2px 10px 0px ${Colors.DarkBack};
  white-space: nowrap;
  .text {
    color: ${Colors.DarkerBack};
    font-size: 1.5vh;
    font-family: 'Roboto', sans-serif;
  }
`;

const formatTimestamp = (seconds: number): string => {
  const pad = (num: number, places: number = 2) =>
    num.toString().padStart(places, '0');
  let minutes: number = Math.floor(seconds / 60);
  let remainingSeconds: number = seconds % 60;

  // Convert remainingSeconds to a string with one decimal place, and ensure it is always displayed with at least two digits
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${remainingSeconds.toFixed(1)}`
      : remainingSeconds.toFixed(1);

  return `${pad(minutes)}:${formattedSeconds}`;
};

export default function WarningButton(props: WarningButtonProps) {
  const [mouseXPosition, setMouseXPosition] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    // Calculate the mouse position relative to the button
    const mouseX = event.clientX - button.getBoundingClientRect().left;
    setMouseXPosition(mouseX);
  };

  return (
    <Background
      onClick={props.onClick}
      style={props.style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setModalVisible(true)}
      onMouseLeave={() => setModalVisible(false)}
    >
      {modalVisible && (
        <Modal style={{ left: mouseXPosition + 'px' }}>
          <div className='text'>
            <div>Time</div>
            <div>
              {formatTimestamp(props.warning.startTime)} -{' '}
              {formatTimestamp(props.warning.endTime)}
            </div>
            <div>Reduce by this amount in area(Number of flashes, Amount of Blue Light, or Amount of Luminance)</div>
            <div>{props.warning.difference.toFixed(2)}</div>
          </div>
        </Modal>
      )}
    </Background>
  );
}
