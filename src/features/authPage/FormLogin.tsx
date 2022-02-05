import './authPage.module.css';
import { useForm } from 'react-hook-form';
import { IDataLogIn } from '../../common/Interfaces';
import { Button, TextField } from '@mui/material';

export const FormLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'admin@admin',
      password: 'admin',
    },
  });

  const validate = (data: IDataLogIn) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit((data: IDataLogIn) => {
        validate(data);
      })}
    >
      <TextField
        helperText="Please enter your email"
        id="outlined-basic"
        label="Email address"
        variant="outlined"
        margin="normal"
        {...register('email')}
        className="input"
        fullWidth
      />
      <TextField
        helperText="Please enter your password"
        id="outlined-basic"
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
        Войти
      </Button>
    </form>
  );
};
