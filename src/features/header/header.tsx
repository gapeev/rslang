import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [isDrawerOpen, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button color="inherit" component={Link} to="/signin">
              Войти
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 300 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button key="Homepage" component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Главная" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="Textbook" component={Link} to="/textbook">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Электронный учебник" />
            </ListItem>
            <ListItem
              button
              key="AudioChallenge"
              component={Link}
              to="/audiochallenge"
            >
              <ListItemIcon>
                <AudiotrackIcon />
              </ListItemIcon>
              <ListItemText primary="Аудиовызов" />
            </ListItem>
            <ListItem button key="Sprint" component={Link} to="/sprint">
              <ListItemIcon>
                <ShutterSpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Спринт" />
            </ListItem>
            <ListItem button key="Statistics" component={Link} to="/statistics">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Статистика" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="Team" component={Link} to="/team">
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="О команде" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
