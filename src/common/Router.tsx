import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../features/authPage/AuthPage';
import { Home } from '../features/home/Home';
import { EnumRoutes } from './Enums';
import TextBookPage from '../features/textbook/TextBook';
export const useRoutes = () => {
  return (
    <Routes>
      <Route path={EnumRoutes.home} element={<Home />}></Route>
      <Route path={EnumRoutes.auth} element={<AuthPage />}></Route>
      <Route path={EnumRoutes.main} element={<Home />}></Route>
      <Route path={EnumRoutes.textbook} element={<TextBookPage />}></Route>
    </Routes>
  );
};
