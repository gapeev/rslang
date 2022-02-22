import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
  status: boolean;
};
export const Preloader: React.FC<Props> = ({ status }) => {
  return <Box sx={{ width: '100%' }}>{status ? <LinearProgress /> : ''}</Box>;
};
