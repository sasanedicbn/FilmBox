import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import Label from "../../../components/UI/Label";
import * as z from 'zod';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/firebase';

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
      console.log('Prijavljen korisnik:', userCredential.user);
    } catch (error) {
      console.error("Greška prilikom prijave:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label text="Email" />
        <Input
          type="email"
          {...register('email')}
          styleType="login"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label text="Password" />
        <Input
          type="password"
          {...register('password')}
          styleType="login"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit">Log in</Button>
    </form>
  );
};

export default LoginForm;
