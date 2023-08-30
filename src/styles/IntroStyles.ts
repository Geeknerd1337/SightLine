import styled from '@emotion/styled';
import { Colors } from './colors';
import { motion } from 'framer-motion';

export const Background = styled(motion.div)`
  background-color: ${Colors.Back};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `;
  
  export const Logo = styled(motion.img)`
    width: 100%;
    max-width: 500px;
    height: auto;
    margin-bottom: 50px;
    `;

