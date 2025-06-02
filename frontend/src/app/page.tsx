import Button from './components/button/button';

export default function Home() {
  return (
    <div className="flex p-4 space-x-4 space-around">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Bienvenue sur notre site</h1>
      <div className="space-x-4">
        <Button label="Explorer un défi" href="/explorer" variant="white" />
        <Button label="Créer un défi" href="/creer" variant="cta" />
      </div>
    </div>
  );
}
