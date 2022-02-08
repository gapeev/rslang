import { Routes, Route } from 'react-router-dom';
import { Audiochallenge } from '../features/audiochallenge/Audiochallenge';
import { AuthPage } from '../features/authPage/AuthPage';
import { Home } from '../features/home/Home';
import { EnumRoutes } from './Enums';

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
    </Routes>
  );
};
