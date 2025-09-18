import http from 'http';
import app from './app';
import { config } from '@/config';

const server = http.createServer(app);

const startServer = () => {
  server.listen(config.api.port, () => {
    console.log(`Servidor rodando na porta ${config.api.port} no modo ${config.env}`);
  });
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido, fechando o servidor graciosamente');
  server.close(() => {
    console.log('Servidor fechado.');
    process.exit(0);
  });
});

startServer();

export default server;
