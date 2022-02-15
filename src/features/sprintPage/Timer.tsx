import { useEffect, useState } from 'react';
import './timer.css';
import AvTimerTwoToneIcon from '@mui/icons-material/AvTimerTwoTone';
import { ModalResults } from './modalResults';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IPairOfGame } from './sprintSlice';

export const Timer: React.FC = () => {
  const [sec, setSec] = useState(60);
  const [isStart, setStart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const words: IPairOfGame[] = useSelector(
    (store: RootState) => store.sprint.words
  );
  const onRestart = (interval: NodeJS.Timeout) => {
    console.log('reset');
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
            //TODO send data to server
          }

          return prevTime - 1;
        });
      }, 1000);
    }
  }, []);

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
