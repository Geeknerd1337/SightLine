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
    position: relative;
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

export const VideoDisplay = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    `;

