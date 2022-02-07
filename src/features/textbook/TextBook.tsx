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
import axios, { AxiosResponse } from 'axios';
import getURLParameter from './core/getUrlParam';
import backgroundGen from './core/backgroundGen';
import calcCorrectWords from './core/calcCorrectWords';
const USERID = '61feaf842989cc0016b27424';
const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmVhZjg0Mjk4OWNjMDAxNmIyNzQyNCIsImlhdCI6MTY0NDI1MzI5MCwiZXhwIjoxNjQ0MjY3NjkwfQ.JyUJpLIB8GY4PfZFQxZwmdm2nkzLphE_Klf97yPiTM8';
const BASE_URL = 'https://learnwords-team31.herokuapp.com/';

const TextBookPage = () => {
  let location = useLocation();
  const AUTH = !!localStorage.getItem('auth') || false;
  const [words, setWords] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const [category, setCategory] = useState(
    +getURLParameter(location.search, 'group')! || 1
  );
  const [page, setPage] = useState(
    +getURLParameter(location.search, 'page')! || 1
  );
  const [pageQty, setpageQty] = useState(30);
  const [correctWords, setCorrectWords] = useState(0);
  useEffect(() => {
    const arrPromis: Promise<AxiosResponse>[] = [];
    const userPromis = loadUserWords(BASE_URL + `users/${USERID}/words`, TOKEN);
    const wordsPromis = loadWords(
      BASE_URL + `words?group=${category - 1}&page=${page - 1}`
    );
    const loadHardWords = loadUserWords(
      BASE_URL +
        `users/${USERID}/aggregatedWords?page=${
          page - 1
        }&wordsPerPage=20&filter=%7B%22userWord.difficulty%22%3A%22hard%22%7D`,
      TOKEN
    );
    if (category === 7) {
      arrPromis.push(loadHardWords);
    } else {
      arrPromis.push(wordsPromis);
    }
    if (localStorage.getItem('auth')) {
      arrPromis.push(userPromis);
    }
    axios.all(arrPromis).then(
      axios.spread((data1, data2) => {
        if (data2) {
          setUserWords(data2.data);
          setCorrectWords(calcCorrectWords(data1.data, data2.data));
        }
        if (data1.data[0].paginatedResults) {
          setWords(data1.data[0].paginatedResults);
          setpageQty(Math.ceil(data1.data[0].totalCount[0].count / 20));
        } else {
          setpageQty(30);
          setWords(data1.data);
        }
      })
    );
  }, [category, page]);
  return (
    <Box className={backgroundGen(category)}>
      <Header title="Учебник" />
      <Container
        className={
          styles.paginationContainer +
          ` ${correctWords === 20 ? styles.easy : ' '}`
        }
      >
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
          to={`/audiochallenge?group=${category}&page=${page}`}
          disabled={correctWords === 20 ? true : false}
        >
          Аудиовызов
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          component={Link}
          to={`/sprint?group=${category}&page=${page}`}
          disabled={correctWords === 20 ? true : false}
        >
          Спринт
        </Button>
      </Container>
      <Container className={styles.cardsContainer}>
        {words.map((el: word) => (
          <Container key={el.id || el._id}>
            <TextBookCard
              id={el.id}
              word={el.word}
              group={el.id}
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
                (word: userWord) =>
                  word.wordId === el.id || word.wordId === el._id
              )}
              image={el.image}
              url={BASE_URL}
              TOKEN={TOKEN}
              USERID={USERID}
              AUTH={AUTH}
            />
          </Container>
        ))}
      </Container>
      <Footer />
    </Box>
  );
};
export default TextBookPage;
