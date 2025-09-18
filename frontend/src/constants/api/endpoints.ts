export const API_ENDPOINTS = {
  GAME: '/internal/game',
  GUESS: (gameId: string) => `/internal/game/${gameId}/guess`,
  CONFIG_GAME: '/internal/config/game',
};
