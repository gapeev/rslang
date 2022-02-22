import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameAgain } from './sprintSlice';
import { RootState } from '../../app/store';
import { ISprintStat } from '../../common/Interfaces';
import { calculateEffect } from './utils';
import { EnumRoutes } from '../../common/Enums';

const RESULT_BAD = 'Попробуй еще раз!';
const RESULT_NOTBAD = 'Неплохой результат!';
const RESULT_GOOD = 'Хороший результат!';
const RESULT_PERFECT = 'Ты лучший!';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PropsModal = {
  open: boolean;
};

export const ModalResults: React.FC<PropsModal> = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stat: ISprintStat = useSelector(
    (store: RootState) => store.sprint.stat
  );

  const handleClose = () => {};

  const displayResultPhrase = () => {
    const percent = calculateEffect(stat.correctAnswers, stat.answersCount);
    if (percent <= 25) return RESULT_BAD;
    else if (percent <= 50) return RESULT_NOTBAD;
    else if (percent <= 75) return RESULT_GOOD;
    else if (percent <= 100) return RESULT_PERFECT;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="modal-results"
    >
      <Box sx={{ bgcolor: 'transparent' }}>
        <DialogContent>
          <DialogTitle
            sx={{
              color: '#00bcd4',
              fontSize: '1.5rem',
              fontFamily: 'Gilroy-Heavy',
            }}
          >
            {displayResultPhrase()}
          </DialogTitle>
          <DialogContentText
            sx={{
              backgroundColor: 'transparent',

              color: '#00bcd4',
              fontSize: '1.5rem',
              fontFamily: 'Gilroy-Heavy',
            }}
          >
            Количество правильных ответов : {stat.correctAnswers}
          </DialogContentText>
          <DialogContentText
            sx={{
              color: '#00bcd4',
              fontSize: '1.5rem',
              fontFamily: 'Gilroy-Heavy',
            }}
          >
            Лучшая серия :{stat.longestSeries}
          </DialogContentText>
          <DialogContentText
            sx={{
              color: '#00bcd4',
              fontSize: '1.5rem',
              fontFamily: 'Gilroy-Heavy',
            }}
          >
            Твой прогресс :
            {calculateEffect(stat.correctAnswers, stat.answersCount)}%
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            sx={{ color: 'white', background: '#00bcd4' }}
            variant="contained"
            onClick={() => {
              dispatch(setGameAgain());
            }}
          >
            Сыграть еще раз
          </Button>
          <Button
            sx={{ color: 'white', background: '#00bcd4' }}
            variant="contained"
            onClick={() => {
              navigate(EnumRoutes.textbook);
            }}
          >
            Перейти в учебник
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
