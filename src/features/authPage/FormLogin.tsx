import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { IUserSignIn } from '../../common/Interfaces';
import { useDispatch } from 'react-redux';
import { EnumRoutes } from '../../common/Enums';
import { getToken, setUser } from './authSlice';
import { useNavigate } from 'react-router-dom';

export const FormLogin: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
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
        error={!!errors.email}
        helperText={errors.email?.message}
        id="outlined-basic1"
        label="Электронная почта"
        variant="outlined"
        margin="normal"
        {...register('email', {
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/i,
            message:
              'Электронная почта должна соответствовать шаблону username@example.com',
          },
          required: {
            value: true,
            message: 'Это поле является обязательным',
          },
        })}
        className="input"
        fullWidth
      />
      <TextField
        error={!!errors.password}
        helperText={errors.password?.message}
        id="outlined-basic2"
        label="Пароль"
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
        {...register('password', {
          required: {
            value: true,
            message: 'Это поле является обязательным',
          },
          minLength: {
            value: 8,
            message: 'Длина пароля должна быть не менее 8 символов',
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
