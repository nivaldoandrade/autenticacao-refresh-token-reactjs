import { IUser } from '@/entities/IUser';
import { UsersService } from '@/services/UsersService';
import { useEffect, useState } from 'react';

export function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    UsersService.getUsers()
      .then(setUsers)
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div className="min-h-screen flex flex-col max-w-[800px] mx-auto px-10 my-4 sm:justify-center sm:my-0">
      <h1 className="text-3xl font-semibold">Bem vindo(a) ao Dashboard!</h1>
      <h2 className="text-muted-foreground">Estes são os usuários cadastrados:</h2>

      <div className="h-10 w-full mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user.id} className="flex flex-col border p-4 rounded-md">
            <strong>{user.name}</strong>
            <small className="text-muted-foreground">Email:<br /> {user.email}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
