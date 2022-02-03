import { Box, Container } from '@mui/material';
import { FormLogin } from './FormLogin';

export const AuthPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          mt: '40px',
          mb: '40px',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          gap: '30px',
        }}
      >
        <div className={`card-container unflipped`}>
          <div className="card">
            <div className="card__front">
              <FormLogin />
            </div>
            <div className="card__back"></div>
          </div>
        </div>
      </Box>
    </Container>
  );
};
