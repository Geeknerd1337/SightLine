import styled from '@emotion/styled';
import { Colors } from '@/styles/colors';
import InfoButton from './InfoButton';

const Background = styled.div`
  background-color: ${Colors.DarkerBack};
  border-bottom: 1px solid black;
  height: 6vh;
  width: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: space-between;
`;

const LogoHolder = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;

  .icon {
    width: auto;
    height: 50%;
  }

  .text {
    font-family: 'Roboto', sans-serif;
    color: ${Colors.Gold};
    font-size: 3vh;
  }
`;

export default function () {
  return (
    <Background>
      <LogoHolder>
        <img src='/logo.svg' className='icon' alt='SightLine Logo' />
        <span className='text'>SightLine</span>
      </LogoHolder>
      <InfoButton />
    </Background>
  );
}
