import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Footer } from './features/footer/footer';
import { Header } from './features/header/header';
import blur from './assets/blur.jpg';
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
          backgroundImage: `url(${blur})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />
        {routes}
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
