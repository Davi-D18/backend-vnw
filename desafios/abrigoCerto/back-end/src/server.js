import { createApp } from './app.js';
import { closePool } from './configs/database.js';

const app = createApp();
const PORT = Number(process.env.PORT || 3000);

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

async function shutdown(signal) {
  console.log(`Recebido ${signal}. Encerrando aplicação...`);
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
