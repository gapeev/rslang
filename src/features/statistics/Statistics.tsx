import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import CounChangeDay from './longStat/CounChangeDay';
import CountCorrectDay from './longStat/CountDay';
import { ShortStatGame } from './shortStat/ShortStatGame';
import { loadStat } from './request/loadStat';
import styles from './Statistics.module.css';
import { ShortStatWords } from './shortStat/ShortStatWords';
import authImg from './img/notAuth.jpeg';
const StatisticsPage = () => {
  const allGraph = () => {
    return (
      <Container>
        <Container>
          <ShortStatGame data={dataStat} />
          <ShortStatWords data={dataStat} />
        </Container>
        <Container>
          <CounChangeDay data={dataStat} />
          <CountCorrectDay data={dataStat} />
        </Container>
      </Container>
    );
  };
  const notAuth = () => {
    return (
      <Container className={styles.notAuthText}>
        <p className={styles.notAuthText}>
          Только авторизированные пользователи могут просматривать статистику!
        </p>
        <img src={authImg} alt="not_AUTH" className={styles.authImg} />
      </Container>
    );
  };
  const AUTH =
    JSON.parse(localStorage.getItem('RSLANG_USER') as string) || false;
  const TOKEN = AUTH ? AUTH.token.token : '';
  const USERID = AUTH ? AUTH.token.userId : '';
  const BASE_URL = 'https://learnwords-team31.herokuapp.com/';
  const [dataStat, setDataStat] = useState({});
  useEffect(() => {
    loadStat(BASE_URL + `users/${USERID}/statistics`, TOKEN).then((data) =>
      setDataStat(data.data)
    );
  }, [TOKEN, USERID]);
  return (
    <Container className={styles.mainContainer}>
      {TOKEN ? allGraph() : notAuth()}
    </Container>
  );
};
export default StatisticsPage;
