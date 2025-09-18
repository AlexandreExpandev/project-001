import dotenv from 'dotenv';

dotenv.config();

/**
 * @summary Objeto de configuração centralizado para a aplicação.
 * Carrega variáveis de ambiente do arquivo .env.
 */
export const config = {
  env: process.env.NODE_ENV || 'development',
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
    },
  },
  // Adicionar outras configurações conforme necessário (ex: banco de dados, JWT)
};
