export function Home() {

  return (
    <div className="min-h-screen flex flex-col max-w-[800px] mx-auto px-10 my-4 sm:justify-center sm:my-0">
      <h1 className="text-3xl font-semibold">Bem vindo(a) ao Dashboard!</h1>
      <h2 className="text-muted-foreground">Estes são os usuários cadastrados:</h2>

      <div className="h-10 w-full mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col border p-4 rounded-md">
          <strong>Usuário 01</strong>
          <small className="text-muted-foreground">Email:<br /> user1@mail.com</small>
        </div>
        <div className="flex flex-col border p-4 rounded-md">
          <strong>Usuário 02</strong>
          <small className="text-muted-foreground">Email:<br /> user2@mail.com</small>
        </div>
        <div className="flex flex-col border p-4 rounded-md">
          <strong>Usuário 03</strong>
          <small className="text-muted-foreground">Email:<br />  user3@mail.com</small>
        </div>
        <div className="flex flex-col border p-4 rounded-md">
          <strong>Usuário 04</strong>
          <small className="text-muted-foreground">Email:<br />  user4@mail.com</small>
        </div>
      </div>
    </div>
  );
}
