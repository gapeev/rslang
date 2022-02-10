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
  const audioCorrectAns =
    (audioGame?.wrongAnswers / audioGame?.answersCount) * 100;
  const sprintCorrectAns =
    (sprintGame?.wrongAnswers / sprintGame?.answersCount) * 100;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: `Краткосрочная статистика по мини-играм`,
      },
    },
  };
  const labels = [
    `Аудиовызов ${audioGame?.lastChanged}`,
    `Спринт ${sprintGame?.lastChanged}`,
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за день',
        data: [audioGame?.newWords, sprintGame?.newWords],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Процент правильных ответов',
        data: [audioCorrectAns, sprintCorrectAns],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Самая длинная серия правильных ответов',
        data: [audioGame?.longestSeries, sprintGame?.longestSeries],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
