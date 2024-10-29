import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/UI/Button';
import Label from '../components/UI/Label';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  
  const onSubmit = async (data: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/home');
      console.log('Korisnik je prijavljen:', userCredential.user);
    } catch (error) {
      toast.error('Error, you can\'t log in! Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
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
      <div className="mb-4">
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
      <Button type="login" onClick={() => console.log('logovan')}>Log in</Button>
    </form>
  );
};

export default LoginForm;
