import styled from '@emotion/styled';
import { Colors } from './colors';

export const WarningContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;

  .warning {
    display: flex;
    justify-content: flex-start;;
    align-items: center;
    text-align: center;
    font-size: 1.3em;
    color: white;
    background-color: ${Colors.DarkGrayWithTransparency};
    border: none;
    padding: 0.4rem;
    margin-bottom: 5px;
    border-radius: 5px;
    gap: 0.9rem;

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
  width: 50%;
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
      font-size: 0.98em;
      color: white;
    }

    & .urlCites {
      font-size: 1.4em;
      color: white;
    }

    & .warningUrls {
      font-size: 0.98em;
      color: white;
      width: 100%;
      
      & a:hover {
        color: ${Colors.Gold};
      }
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