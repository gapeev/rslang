import { Box, Typography } from '@mui/material';
import { ISprintStat } from '../../common/Interfaces';

type PropsCounter = {
  stat: ISprintStat;
};

export const CounterPanelSprint: React.FC<PropsCounter> = ({ stat }) => {
  return (
    <Box>
      <Typography
        sx={{
          color: '#ffd600',
          fontSize: '1rem',
          fontFamily: 'Gilroy-Heavy',
        }}
      >
        Количество пройденных слов :{stat.answersCount}
      </Typography>
      <Typography
        sx={{
          color: '#ffd600',
          fontSize: '1rem',
          fontFamily: 'Gilroy-Heavy',
        }}
      >
        Количество правильных ответов : {stat.correctAnswers}
      </Typography>{' '}
      <Typography
        sx={{
          color: '#ffd600',
          fontSize: '1rem',
          fontFamily: 'Gilroy-Heavy',
        }}
      >
        Твой кпд :{' '}
        {`${Math.round((stat.correctAnswers / stat.answersCount) * 100)}%`}
      </Typography>
    </Box>
  );
};
