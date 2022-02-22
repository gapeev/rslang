import { useEffect, useState } from 'react';
import './timer.css';
import AvTimerTwoToneIcon from '@mui/icons-material/AvTimerTwoTone';
import { ModalResults } from './modalResults';
import { setFinishGame } from './sprintSlice';
import { useDispatch } from 'react-redux';

export const Timer: React.FC = () => {
  const [sec, setSec] = useState(59);
  const [isStart, setStart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const onRestart = (interval: NodeJS.Timeout) => {
    clearInterval(interval);
  };

  useEffect(() => {
    if (sec > 0 && isStart) {
      const interval = setInterval(() => {
        setSec((prevTime) => {
          if (prevTime === 1) {
            setStart(false);
            onRestart(interval);
            setOpenModal(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isStart) {
      dispatch(setFinishGame(true));
    }
  }, [dispatch, isStart, openModal]);

  return (
    <div className="container_timer">
      <div className="timer_seconds">
        <div className="timer_seconds-title">
          <AvTimerTwoToneIcon fontSize="large" />
        </div>
        <div className="timer_seconds-counter">
          {`${Number(sec) < 10 ? `0${sec}` : sec}`}
        </div>
      </div>

      <ModalResults open={openModal} />
    </div>
  );
};
