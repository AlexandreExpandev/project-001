import { GameInterface } from './_impl';

/**
 * @page HomePage
 * @description A página principal do jogo GuessNumber.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <GameInterface />
    </main>
  );
}
