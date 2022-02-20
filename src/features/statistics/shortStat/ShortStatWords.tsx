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
export const ShortStatWords = (props: dataStat) => {
  const mainObject = props.data?.optional?.gameStatistics as gameStatistics;
  const audioGame = mainObject?.audiochallenge;
  const sprintGame = mainObject?.sprint;
  const dateNow = getCurrentDateForStatistics();
  let audioCorrectAns = 0;
  let sprintCorrectAns = 0;
  let audioNewWords = 0;
  let sprintNewWords = 0;
  let audioLongestSeries = 0;
  let sprintLongestSeries = 0;

  if (dateNow === audioGame?.lastChanged) {
    audioCorrectAns =
      (audioGame?.correctAnswers / audioGame?.answersCount) * 100;
    audioNewWords += audioGame?.newWords;
    audioLongestSeries += audioGame?.longestSeries;
  }

  if (dateNow === sprintGame?.lastChanged) {
    sprintCorrectAns =
      (sprintGame?.correctAnswers / sprintGame?.answersCount) * 100;
    sprintNewWords += sprintGame?.newWords;
    sprintLongestSeries += sprintGame?.longestSeries;
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: `Краткосрочная статистика по мини-играм ${dateNow}`,
      },
    },
  };
  const labels = [`Аудиовызов ${dateNow}`, `Спринт ${dateNow}`];
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за день',
        data: [audioNewWords, sprintNewWords],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Процент правильных ответов',
        data: [audioCorrectAns, sprintCorrectAns],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Самая длинная серия правильных ответов',
        data: [audioLongestSeries, sprintLongestSeries],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} className={styles.shortGraph} />;
};
