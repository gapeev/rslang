import './authPage.module.css';
import { useForm } from 'react-hook-form';
import { IDataLogIn } from '../../common/Interfaces';

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
    <>
      <form
        className="form"
        onSubmit={handleSubmit((data: IDataLogIn) => {
          validate(data);
        })}
      >
        <h3>Log in</h3>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            {...register('email', { required: true })}
            type="email"
            className="htmlForm-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            {...register('password', {
              required: 'This is requiered',
              minLength: {
                value: 4,
                message: 'Min length is four sympols',
              },
            })}
            type="password"
            className="htmlForm-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entry
        </button>
      </form>
    </>
  );
};
