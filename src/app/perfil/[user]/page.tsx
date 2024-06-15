export default async function ProfileUserPage({
  params,
}: {
  params: { user: string };
}) {
  return (
    <main>
      <h1>Usuário: {params.user}</h1>
    </main>
  );
}
