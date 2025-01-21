import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';

interface IFormData {
  email: string;
  password: string
}

export function SignIn() {
  const { signIn } = useAuth();

  const form = useForm<IFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      signIn(email, password);
    } catch {
      console.log('error');
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <h1 className="font-semibold text-xl">Acesse sua conta</h1>

      <form onSubmit={handleSubmit} className='flex flex-col mt-8 gap-2'>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register('email')} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" {...form.register('password')} />
        </div>

        <Button className='mt-3'>
          Entrar
        </Button>
      </form>
    </div>
  );
}
