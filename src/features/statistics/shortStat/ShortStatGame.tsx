import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCurrentDateForStatistics } from '../../stat/utils';
import { dataStat } from '../interfaces';
import { gameStatistics } from '../interfaces';
import styles from '../Statistics.module.css';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const ShortStatGame = (props: dataStat) => {
  const dateNow = getCurrentDateForStatistics();
  const mainObject = props.data?.optional?.gameStatistics as gameStatistics;
  const audioGame = mainObject?.audiochallenge;
  const sprintGame = mainObject?.sprint;
  let newWords = 0;
  let learnedWords = 0;
  let correctAnswers = 0;
  let answersCount = 0;
  if (dateNow === audioGame?.lastChanged) {
    newWords += audioGame?.newWords;
    learnedWords += audioGame?.learnedWords;
    correctAnswers += audioGame?.correctAnswers;
    answersCount += audioGame?.answersCount;
  }
  if (dateNow === sprintGame?.lastChanged) {
    newWords += sprintGame?.newWords;
    learnedWords += sprintGame?.learnedWords;
    correctAnswers += sprintGame?.answersCount;
    answersCount += sprintGame?.answersCount;
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: `Краткосрочная статистика по словам ${dateNow}`,
      },
    },
  };
  const labels = [``];
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за день',
        data: [newWords],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Количество изученных слов за день',
        data: [learnedWords],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Процент правильных ответов за день',
        data: [(correctAnswers / answersCount) * 100],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} className={styles.shortGraph} />;
};
