import styled from '@emotion/styled';
import { Colors } from './colors';
import { motion } from 'framer-motion';

//Video container
export const VideoContainer = styled.div`
    width: 60%;
    background-color: ${Colors.Gray};
    aspect-ratio: 16/9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const UploadLabel = styled.div`
    color: ${Colors.Text};
    font-size: 1.5rem;
    `;

