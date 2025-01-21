import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export function SignIn() {

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <h1 className="font-semibold text-xl">Acesse sua conta</h1>

      <form className='flex flex-col mt-8 gap-2'>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" />
        </div>

        <Button className='mt-3'>
          Entrar
        </Button>
      </form>
    </div>
  );
}
