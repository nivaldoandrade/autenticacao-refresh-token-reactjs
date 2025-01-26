import { LogOutIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip } from './ui/tooltip';
import { useAuth } from '@/hooks/useAuth';

export function Appbar() {

  const { signedIn, signOut } = useAuth();

  if (!signedIn) {
    return null;
  }

  return (
    <div className='fixed right-4 top-4 flex items-center'>

      <Tooltip content="Sair" >
        <Button onClick={signOut} variant="secondary" size="icon" className='rounded-full'>
          <LogOutIcon />
        </Button>
      </Tooltip>

    </div>
  );
}
