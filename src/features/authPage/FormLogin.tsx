import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IUserSignIn } from '../../common/Interfaces';
import { useDispatch } from 'react-redux';
import { EnumRoutes } from '../../common/Enums';
import { getToken, setUser } from './authSlice';
import { useNavigate } from 'react-router-dom';

export const FormLogin: React.FC = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: 'greg@gmail.com',
      password: '11111111',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validate = (data: IUserSignIn) => {
    console.log(data);
    dispatch(setUser(data.email));
    dispatch(getToken(data));
    navigate(EnumRoutes.home);
  };

  return (
    <form
      onSubmit={handleSubmit((data: IUserSignIn) => {
        validate(data);
      })}
    >
      <TextField
        helperText="Please enter your email"
        id="outlined-basic1"
        label="Email address"
        variant="outlined"
        margin="normal"
        {...register('email')}
        className="input"
        fullWidth
      />
      <TextField
        helperText="Please enter your password"
        id="outlined-basic2"
        label="Password"
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
        {...register('password', {
          required: 'This is requiered',
          minLength: {
            value: 4,
            message: 'Min length is four sympols',
          },
        })}
        className="input"
      />
      <Button type="submit" className="btn btn-primary">
        Вход
      </Button>
    </form>
  );
};
