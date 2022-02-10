import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { CardSprint } from './CardSprint';
import { Timer } from './Timer';

export const GameSprint: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Timer />
      <CardSprint />
    </Box>
  );
};
