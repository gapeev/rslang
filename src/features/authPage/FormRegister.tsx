import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { IUserSignUp } from '../../common/Interfaces';
import { clearErrorMessage } from './authSlice';
import { axiosUserSignUp } from './apiAuth';
import { TextField, Button, Alert } from '@mui/material';

export const FormRegister: React.FC = () => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserSignUp>();

  const validate = async (data: IUserSignUp) => {
    const { error } = await axiosUserSignUp(data);
    setErrorMessage('');
    setSuccessMessage('');
    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage('Пользователь успешно зарегистрирован');
    }
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit((data: IUserSignUp) => {
        validate(data);
      })}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <TextField
        error={!!errors.name}
        helperText={errors.name?.message}
        id="outlined-basic1"
        label="Имя"
        variant="outlined"
        margin="normal"
        {...register('name', {
          required: {
            value: true,
            message: 'Это поле является обязательным',
          },
        })}
        className="input"
        fullWidth
      />
      <TextField
        error={!!errors.email}
        helperText={errors.email?.message}
        id="outlined-basic2"
        label="Электронная почта"
        fullWidth
        margin="normal"
        variant="outlined"
        type="email"
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
      />
      <TextField
        error={!!errors.password}
        helperText={errors.password?.message}
        id="outlined-basic3"
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
        Зарегистрироваться
      </Button>
    </form>
  );
};
