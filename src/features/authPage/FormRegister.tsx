import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IUserSignUp } from '../../common/Interfaces';
import { axiosUserSignUp } from './apiAuth';

export const FormRegister: React.FC = () => {
  const { register, handleSubmit } = useForm<IUserSignUp>();

  const validate = (data: IUserSignUp) => {
    console.log(data);

    axiosUserSignUp(data);
  };
  return (
    <form
      onSubmit={handleSubmit((data: IUserSignUp) => {
        validate(data);
      })}
    >
      <TextField
        helperText="Введите имя"
        id="outlined-basic1"
        label="Имя"
        variant="outlined"
        margin="normal"
        {...register('name')}
        className="input"
        fullWidth
      />
      <TextField
        helperText="Введите адрес электронной почты"
        id="outlined-basic2"
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
        id="outlined-basic3"
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
        Зарегистрироваться
      </Button>
    </form>
  );
};
