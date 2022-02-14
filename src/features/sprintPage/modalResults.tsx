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
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { Animate } from 'react-move';
import { easeQuadInOut } from 'd3-ease';
import { useEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGameAgain, setStartGame } from './sprintSlice';

const TITLE_MODAL = 'Твой результат';

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
  const handleClose = () => {
    console.log('close');
  };
  /*   const handleClickOpen = () => {
      setOpen(true)
  };
  const handleClickClose = () => {
    setOpen(false)
}; */
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="modal-results"
    >
      <DialogContent>
        <DialogTitle id="modal-results">{TITLE_MODAL}</DialogTitle>
        <DialogContentText>Слбаовато ! Попробуй еще раз!</DialogContentText>
        <DialogContentText>Количество правильных ответов</DialogContentText>
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

      <DialogActions>
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
