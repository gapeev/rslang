import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { startGame, User } from './audiochallengeSlice';
import { statInit } from '../stat/statSlice';
import styles from './Welcome.module.css';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { GROUPS_COUNT_IN_GAME, NO_PAGE } from './constants';

export default function Welcome() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const {
    token: { token, userId },
  } = useAppSelector((state: RootState) => state.user);

  const groupParam = searchParams.get('group');
  const pageParam = searchParams.get('page');
  const hasGroupPage = groupParam !== null && pageParam !== null;

  const user: User = useMemo(
    () => ({
      id: userId,
      token,
      isAuth: userId !== '',
    }),
    [userId, token]
  );

  useEffect(() => {
    dispatch(statInit({ user }));
  }, [dispatch, user]);

  return (
    <Box
      maxWidth="lg"
      sx={{
        margin: 'auto',
        color: '#fff',
      }}
    >
      <Typography variant="h2" align="center" gutterBottom component="div">
        Аудиовызов
      </Typography>
      <Typography variant="h4" align="center" gutterBottom component="div">
        Эта тренировка улучшает восприятие речи на слух
      </Typography>
      <ul className={styles.featuresList}>
        <li>В тренировке можно использовать мышь</li>
        <li>Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
        <li>Используйте пробел для повторного звучания слова</li>
        <li>Используйте клавишу Enter для перехода к следующему слову</li>
      </ul>
      <Box sx={{ textAlign: 'center' }}>
        {hasGroupPage ? (
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              dispatch(
                startGame({
                  group: Number(groupParam),
                  page: Number(pageParam),
                  user,
                })
              );
            }}
          >
            Начать
          </Button>
        ) : (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            {[...Array(GROUPS_COUNT_IN_GAME)].map((_, index) => (
              <Button
                key={index}
                size="large"
                onClick={() => {
                  dispatch(startGame({ group: index, page: NO_PAGE, user }));
                }}
              >
                Раздел {index + 1}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
}
