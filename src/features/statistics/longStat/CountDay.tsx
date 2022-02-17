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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const CountDay = (props: dataStat) => {
  const mainObject = props.data?.optional?.wordStatistics || {};
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Общее количество изученных слов по дням',
      },
    },
  };
  const labels = Object.keys(mainObject);
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество слов',
        data: Object.values(mainObject),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
export default CountDay;
