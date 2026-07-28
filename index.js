import dotenv from 'dotenv';
import { initServer } from './configs/app.js';

dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

console.log(`Iniciando servidor de TRANSMETRO-CONECTA USUARIO...`);

import { app } from './configs/app.js';
import { dbConnection } from './configs/db.js';

// Si estamos en Vercel, iniciamos la DB (sin bloquear el export) y exportamos la app
if (process.env.VERCEL) {
    dbConnection();
} else {
    // Modo local
    initServer();
}

export default app;
