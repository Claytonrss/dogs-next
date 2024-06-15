export default async function PhotoIdPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main>
      <h1>Foto id: {params.id}</h1>
    </main>
  );
}
