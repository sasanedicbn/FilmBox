import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/UI/Button';
import Label from '../components/UI/Label';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

const signupSchema = z.object({
  name: z.string().min(1, { message: 'You have to write full name' }),
  lastname: z.string().min(1, { message: 'You have to write full last name' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('You have successfully created a user');
    } catch (error) {
      toast.error('Unable to create new user');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <Label text="Name" />
        <input
          type="text"
          placeholder="Enter your name"
          {...register('name')}
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
        )}
      </div>
      <div className="mb-2">
        <Label text="Last name" />
        <input
          type="text"
          placeholder="Enter your last name"
          {...register('lastname')}
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />
        {errors.lastname?.message && (
          <p className="text-red-500 text-sm mt-1">{String(errors.lastname.message)}</p>
        )}
      </div>
      <div className="mb-2">
        <Label text="Email" />
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
        )}
      </div>
      <div className="mb-2">
        <Label text="Password" />
        <input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>
        )}
      </div>
      <Button type="login" onClick={() => console.log('sign up')}>Sign up</Button>
    </form>
  );
};

export default Signup;
