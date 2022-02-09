import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import CounChangeDay from './longStat/CounChangeDay';
import CountCorrectDay from './longStat/CountDay';
import { loadStat } from './request/loadStat';
import styles from './Statistics.module.css';
const StatisticsPage = () => {
  const allGraph = () => {
    return (
      <>
        <CounChangeDay data={dataStat} />
        <CountCorrectDay data={dataStat} />
      </>
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
      {TOKEN ? allGraph() : ''}
    </Container>
  );
};
export default StatisticsPage;
