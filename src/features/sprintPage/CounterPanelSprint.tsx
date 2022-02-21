import { Box, Typography } from '@mui/material';
import { ISprintStat } from '../../common/Interfaces';
import { calculateEffect } from './utils';
import styles from './SprintPage.module.css';

type PropsCounter = {
  stat: ISprintStat;
  points: number;
};

export const CounterPanelSprint: React.FC<PropsCounter> = ({
  stat,
  points,
}) => {
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
      </Typography>
      <Typography
        sx={{
          color: '#ffd600',
          fontSize: '1rem',
          fontFamily: 'Gilroy-Heavy',
        }}
      >
        Твой кпд :
        {`${calculateEffect(stat.correctAnswers, stat.answersCount)}%`}
      </Typography>
      <div className={styles.sprint__score}>{`Очки: ${points}`}</div>
    </Box>
  );
};
