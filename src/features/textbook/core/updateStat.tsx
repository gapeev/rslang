import axios from 'axios';
import { getCurrentDateForStatistics } from '../../stat/utils';
const updateStat = (
  direction: string,
  TOKEN: string,
  UserID: string,
  URL: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  const statUrl = URL + `users/${UserID}/statistics`;
  const dateNow = getCurrentDateForStatistics();

  axios
    .get(statUrl, config)
    .then((data) => {
      const res = data.data;
      const lastKey = Object.keys(res.optional.wordStatistics);
      const lastValue =
        res.optional.wordStatistics[lastKey[lastKey.length - 1]] || 0;

      if (direction === 'plus') {
        res.optional.wordStatistics[dateNow] = lastValue + 1;
      }
      if (direction === 'minus') {
        res.optional.wordStatistics[dateNow] = lastValue - 1;
      }
      delete res.id;
      axios.put(statUrl, res, config);
    })
    // Если нету создается
    .catch(() => {
      if (direction === 'plus') {
        const body = {
          optional: {
            wordStatistics: {
              [dateNow]: 1,
            },
          },
        };
        axios.put(statUrl, body, config);
      }
    });
};
export default updateStat;
