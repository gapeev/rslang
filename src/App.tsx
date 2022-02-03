import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Footer } from './features/footer/footer';
import { Header } from './features/header/header';
import book from './assets/book.jpg';
import { useRoutes } from './common/Router';

function App() {
  const routes = useRoutes();

  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: `url(${book})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header title="Главная" />
        {routes}
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
