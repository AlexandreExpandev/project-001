import React from 'react';
import { GameProvider } from '@/contexts/game';

/**
 * @layout PublicLayout
 * @description Layout para as páginas públicas, envolvendo-as com o GameProvider.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
