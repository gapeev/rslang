import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAudiochallengeState } from './audiochallengeSlice';
import { Box, Icon } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

export default function Progress() {
  const { words, answers } = useAppSelector(selectAudiochallengeState);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
      }}
    >
      {[...Array(words.length)].map((_, index) => {
        let color: 'inherit' | 'success' | 'warning' = 'inherit';
        if (answers[index]?.isRight) {
          color = 'success';
        }
        if (answers[index] && !answers[index].isRight) {
          color = 'warning';
        }
        return (
          <Icon key={index} fontSize="small" color={color}>
            <CircleIcon fontSize="small" />
          </Icon>
        );
      })}
    </Box>
  );
}
