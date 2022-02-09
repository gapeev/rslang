import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { dataStat } from '../interfaces';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CounChangeDay = (props: dataStat) => {
  const mainObject = props.data?.optional?.wordStatistics || {};
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Количество за день',
      },
    },
  };
  const labels = Object.keys(mainObject);
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество слов',
        data: Object.values(mainObject).map((el, ind, arr) =>
          ind === 0 ? el : Number(el) - Number(arr[ind - 1])
        ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
export default CounChangeDay;
