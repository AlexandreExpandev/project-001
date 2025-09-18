import React from 'react';

/**
 * @layout WorkspaceLayout
 * @description Layout para as rotas autenticadas e de administração.
 */
export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  // Futuramente, este layout pode conter navegação de admin, verificação de autenticação, etc.
  return <>{children}</>;
}
