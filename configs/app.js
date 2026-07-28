'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import tourRoutes from '../src/tours/tour.routes.js';
import walletRoutes from '../src/wallets/wallet.routes.js';
import profileRoutes from '../src/profiles/profile.routes.js';

const BASE_URL = '/TRANSMETRO-CONECTA-USUARIO/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(`${BASE_URL}/tours`, tourRoutes);
    app.use(`${BASE_URL}/wallets`, walletRoutes);
    app.use(`${BASE_URL}/profiles`, profileRoutes);
};

const app = express();

// Vercel Serverless: Configuración síncrona
middlewares(app);
routes(app);

app.get(`${BASE_URL}/health`, (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'TRANSMETRO-CONECTA Usuario',
        version: '1.0.0'
    });
});

const initServer = async () => {
    const PORT = process.env.PORT || 3003;
    try {
        await dbConnection();
        app.listen(PORT, () => {
            console.log(`Servidor de usuario corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });
    } catch (error) {
        console.log('Error al iniciar servidor de usuario:', error);
    }
};

export { app, initServer };
