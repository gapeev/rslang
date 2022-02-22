import { Box, Container } from '@mui/material';
import notFoundImage from '../../assets/notFound.jpeg';

function NotFound() {
  return (
    <Container sx={{ margin: 'auto' }}>
      <Box
        component="img"
        src={notFoundImage}
        alt="Not found"
        sx={{ width: '100%' }}
      />
    </Container>
  );
}

export default NotFound;
