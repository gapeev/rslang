import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IDataLogIn } from '../../common/Interfaces';
import { register } from '../../serviceWorker';

export const FormRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validate = (data: any) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        validate(data);
      })}
    >
      <TextField
        helperText="Введите имя"
        id="outlined-basic"
        label="Имя"
        variant="outlined"
        margin="normal"
        {...register('firstName')}
        className="input"
        fullWidth
      />
      <TextField
        helperText="Введите фамилию"
        id="outlined-basic"
        label="Фамилия"
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
        {...register('lastName')}
        className="input"
      />
      <TextField
        helperText="Введите адрес электронной почты"
        id="outlined-basic"
        label="Электронная почта"
        fullWidth
        margin="normal"
        variant="outlined"
        type="email"
        {...register('email')}
        className="input"
      />
      <TextField
        helperText="Придумайте пароль"
        id="outlined-basic"
        label="Пароль"
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
        Войти
      </Button>
    </form>
  );
};
