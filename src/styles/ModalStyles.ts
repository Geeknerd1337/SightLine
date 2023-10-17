import styled from '@emotion/styled';
import { Colors } from './colors';

export const WarningContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;

  .warning {
    font-size: 1.5em;
    color: white;
    background-color: transparent;
    border: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const WarningModal = styled.div`
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

  & .textHolder {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 100%;
    & .warningTitle {
      font-size: 1.4em;
      color: white;
    }

    & .warningText {
      font-size: 1em;
      color: white;
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
  }
`;