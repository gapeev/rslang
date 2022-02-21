import * as React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { EnumRoutes } from '../../common/Enums';
import { User } from '../audiochallenge/audiochallengeSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { FormLogin } from './FormLogin';
import { FormRegister } from './FormRegister';
import { clearErrorMessage } from './authSlice';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="tabpanel"
    >
      {value === index && <Box sx={{ p: 3, height: '100%' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);

  const {
    token: { token, userId },
  } = useAppSelector((state: RootState) => state.user);

  const user: User = {
    id: userId,
    token,
    isAuth: userId !== '',
  };

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  if (user.isAuth) {
    return <Navigate to={EnumRoutes.home} replace={true} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <Card
        sx={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'height 0.3s ease-in-out',
        }}
      >
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Войти" {...a11yProps(0)} />
                <Tab label="Регистрация" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <FormLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormRegister />
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
