import { Routes, Route } from 'react-router-dom';
import { Audiochallenge } from '../features/audiochallenge/Audiochallenge';
import { AuthPage } from '../features/authPage/AuthPage';
import { Home } from '../features/home/Home';
import { EnumRoutes } from './Enums';
import TextBookPage from '../features/textbook/TextBook';
import StatisticsPage from '../features/statistics/Statistics';
export const useRoutes = () => {
  return (
    <Routes>
      <Route path={EnumRoutes.home} element={<Home />}></Route>
      <Route path={EnumRoutes.auth} element={<AuthPage />}></Route>
      <Route
        path={EnumRoutes.audiochallenge}
        element={<Audiochallenge />}
      ></Route>
      <Route path={EnumRoutes.main} element={<Home />}></Route>
      <Route path={EnumRoutes.textbook} element={<TextBookPage />}></Route>
      <Route path={EnumRoutes.statistics} element={<StatisticsPage />}></Route>
    </Routes>
  );
};
