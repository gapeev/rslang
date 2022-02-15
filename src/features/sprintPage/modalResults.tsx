import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGameAgain, setStartGame } from './sprintSlice';
import { RootState } from '../../app/store';
import { ISprintStat, SprintStat } from '../../common/Interfaces';
import { calculateEffect } from './creatorPair';

const TITLE_MODAL = 'Твой результат';
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

  const handleClose = () => {
    console.log('close');
  };
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
      <DialogContent
        sx={{
          background: '#e9e9e54',
        }}
      >
        <DialogTitle
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          {displayResultPhrase()}
        </DialogTitle>
        <DialogContentText
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          Количество правильных ответов :{stat.correctAnswers}%
        </DialogContentText>
        <DialogContentText
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          Лучшая серия:
          {stat.longestSeries}
        </DialogContentText>
        <DialogContentText
          sx={{
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'Gilroy-Heavy',
          }}
        >
          Твой прогресс:
          {calculateEffect(stat.correctAnswers, stat.answersCount)}%
        </DialogContentText>
      </DialogContent>
      {/* <Animate
       start={() => ({
          value: 0,
        })}
        update={() => ({
          value: 100,
          timing: {
            duration:1.4 * 1000,
            ease: easeQuadInOut,
          },
        })}
    >
         {value}
    </Animate> */}

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          sx={{ color: '#ffd600', background: '#00bcd4' }}
          variant="contained"
          onClick={() => {
            dispatch(setGameAgain());
          }}
        >
          Сыграть еще раз
        </Button>
        <Button
          sx={{ color: '#ffd600', background: '#00bcd4' }}
          variant="contained"
          onClick={() => {
            navigate('/');
          }}
        >
          Перейти в учебник
        </Button>
      </DialogActions>
    </Dialog>
  );
};
