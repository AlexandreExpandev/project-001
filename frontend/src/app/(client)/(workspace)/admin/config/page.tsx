import { ConfigForm } from './_impl';

/**
 * @page AdminConfigPage
 * @description Página para administradores configurarem o intervalo do jogo.
 */
export default function AdminConfigPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <ConfigForm />
    </main>
  );
}
