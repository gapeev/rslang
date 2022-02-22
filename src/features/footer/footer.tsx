import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import rsschool from '../../assets/rs-school.svg';

const pagesWithoutFooter: string[] = ['/audiochallenge', '/sprint'];

export function Footer() {
  const location = useLocation();

  if (pagesWithoutFooter.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          color: '#fff',
          backgroundColor: '#1976d2',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>RS Lang 2022</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <Link
                href="https://github.com/Uladziby"
                color="inherit"
                underline="hover"
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
              >
                Uladziby
              </Link>
              <Link
                href="https://github.com/alepashkou"
                color="inherit"
                underline="hover"
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
              >
                Alepashkou
              </Link>
              <Link
                href="https://github.com/gapeev"
                color="inherit"
                underline="hover"
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
              >
                Gapeev
              </Link>
            </Box>
            <Link href="https://rs.school/js/">
              <img src={rsschool} alt="rs school logo" width={100} />
            </Link>
          </Toolbar>
        </Container>
      </Box>
    </>
  );
}
