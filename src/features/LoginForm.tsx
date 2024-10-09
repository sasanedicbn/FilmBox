import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '../components/UI/Button';
import Label from '../components/UI/Label';
import { auth } from '../config/firebase';

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

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
  
      console.log('Korisnik je prijavljen:', userCredential.user);
    } catch (error) {
      console.error('Greška prilikom prijave:', error.message);
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
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <Label text="Password" />
        <input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <Button type="login">Log in</Button>
    </form>
  );
};

export default LoginForm;
