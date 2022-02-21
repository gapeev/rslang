import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { getToken } from './authSlice';
import { IUserSignIn } from '../../common/Interfaces';
import { Alert, Button, TextField } from '@mui/material';

export const FormLogin: React.FC = () => {
  const { errorMessage } = useAppSelector((state: RootState) => state.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const validate = (data: IUserSignIn) => {
    dispatch(getToken(data));
  };

  return (
    <form
      onSubmit={handleSubmit((data: IUserSignIn) => {
        validate(data);
      })}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
