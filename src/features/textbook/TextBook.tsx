import { useState, useEffect } from 'react';
import { Link as NavLink, useLocation, Link } from 'react-router-dom';
import {
  Pagination,
  PaginationItem,
  Select,
  MenuItem,
  Container,
  Button,
  Box,
} from '@mui/material';
import TextBookCard from './TextBookCard';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import styles from './Textbook.module.css';
import { word } from './interfaces';
import { loadWords, loadUserWords } from './request/loadData';
import { userWord } from './interfaces';
function getURLParameter(sUrl: string, sParam: string) {
  let sPageURL = sUrl.substring(sUrl.indexOf('?') + 1);
  let sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i++) {
    let sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
}
const USERID = '61feaf842989cc0016b27424';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmVhZjg0Mjk4OWNjMDAxNmIyNzQyNCIsImlhdCI6MTY0NDE3NDQ4MywiZXhwIjoxNjQ0MTg4ODgzfQ.U924P1RHSipbZLdWeePiOZCV9uecPk9f17ZSDxTCEfY';
const BASE_URL = 'https://learnwords-team31.herokuapp.com/';
const TextBookPage = () => {
  let location = useLocation();
  const AUTH = localStorage.getItem('auth') || false;
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [category, setCategory] = useState(
    +getURLParameter(location.search, 'group')! || 1
  );
  const [page, setPage] = useState(
    +getURLParameter(location.search, 'page')! || 1
  );
  const pageQty = 30;
  useEffect(() => {
    loadUserWords(BASE_URL + `users/${USERID}/words`, TOKEN).then(
      ({ data }) => {
        setUserWords(data);
      }
    );
    loadWords(BASE_URL + `words?group=${category - 1}&page=${page - 1}`).then(
      ({ data }) => {
        setWords(data);
      }
    );
  }, [category, page]);

  return (
    <Box>
      <Header title="Учебник" />

      <Container className={styles.paginationContainer}>
        <Select
          value={category}
          label="Category"
          onChange={(event) => {
            setCategory(Number(event.target.value));
            window.location.assign(
              `/textbook?group=${event.target.value}&page=${page}`
            );
          }}
        >
          <MenuItem value={1}>Уровень 1</MenuItem>
          <MenuItem value={2}>Уровень 2</MenuItem>
          <MenuItem value={3}>Уровень 3</MenuItem>
          <MenuItem value={4}>Уровень 4</MenuItem>
          <MenuItem value={5}>Уровень 5</MenuItem>
          <MenuItem value={6}>Уровень 6</MenuItem>
          {AUTH ? <MenuItem value={7}>Сложные слова</MenuItem> : ''}
        </Select>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
            showFirstButton
            showLastButton
            sx={{ marginY: 3, marginX: 'auto' }}
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`/textbook?group=${category}&page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        <Button
          variant="contained"
          className={styles.button}
          component={Link}
          to={`/audiochallenge`}
        >
          Аудиовызов
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          component={Link}
          to={`/sprint`}
        >
          Спринт
        </Button>
      </Container>
      <Container className={styles.cardsContainer}>
        {words.map((el: word) => (
          <Container key={el.id}>
            <TextBookCard
              id={el.id}
              word={el.word}
              audio={el.audio}
              audioMeaning={el.audioMeaning}
              audioExample={el.audioExample}
              textMeaning={el.textMeaning}
              textExample={el.textExample}
              transcription={el.transcription}
              textExampleTranslate={el.textExampleTranslate}
              textMeaningTranslate={el.textMeaningTranslate}
              wordTranslate={el.wordTranslate}
              userWords={userWords.filter(
                (word: userWord) => word.wordId === el.id
              )}
              image={el.image}
              url={BASE_URL}
              TOKEN={TOKEN}
            />
          </Container>
        ))}
      </Container>
      <Footer />
    </Box>
  );
};
export default TextBookPage;
