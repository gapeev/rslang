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
  const mainObject = props.data?.optional?.gameStatistics as gameStatistics;
  const audioGame = mainObject?.audiochallenge;
  const sprintGame = mainObject?.sprint;
  const countCorrectAns =
    ((audioGame?.correctAnswers + sprintGame?.correctAnswers) /
      (audioGame?.answersCount + sprintGame?.answersCount)) *
    100;
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: `Краткосрочная статистика по словам`,
      },
    },
  };
  const labels = [``];
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за день',
        data: [audioGame?.newWords + sprintGame?.newWords],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Количество изученных слов за день',
        data: [audioGame?.learnedWords + sprintGame?.learnedWords],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Процент правильных ответов за день',
        data: [countCorrectAns],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} className={styles.shortGraph} />;
};
