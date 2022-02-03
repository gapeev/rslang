import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../features/authPage/authPage';
import { Home } from '../features/home/Home';
import { EnumRoutes } from './Enums';

export const useRoutes = () => {
  return (
    <Routes>
      <Route path={EnumRoutes.home} element={<Home />}></Route>
      <Route path={EnumRoutes.auth} element={<AuthPage />}></Route>
    </Routes>
  );
};
