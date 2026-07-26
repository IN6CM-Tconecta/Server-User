import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';
import { userHasActiveWallet } from './data-validators.js';

export const planTourValidator = [
    (req, res, next) => {
        req.body = req.body || {};
        if (!req.body.userId && req.user?.id) {
            req.body.userId = req.user.id;
        }
        next();
    },

    body('userId', 'El ID de usuario es obligatorio').notEmpty().isString(),
    body('userId').custom(userHasActiveWallet),

    body('originLat', 'La latitud de origen es obligatoria y debe ser un número').notEmpty().isNumeric(),
    body('originLat', 'Latitud de origen inválida (debe estar entre -90 y 90)').isFloat({ min: -90, max: 90 }),
    body('originLon', 'La longitud de origen es obligatoria y debe ser un número').notEmpty().isNumeric(),
    body('originLon', 'Longitud de origen inválida (debe estar entre -180 y 180)').isFloat({ min: -180, max: 180 }),

    body('destLat', 'La latitud de destino es obligatoria y debe ser un número').notEmpty().isNumeric(),
    body('destLat', 'Latitud de destino inválida (debe estar entre -90 y 90)').isFloat({ min: -90, max: 90 }),
    body('destLon', 'La longitud de destino es obligatoria y debe ser un número').notEmpty().isNumeric(),
    body('destLon', 'Longitud de destino inválida (debe estar entre -180 y 180)').isFloat({ min: -180, max: 180 }),

    checkValidators
];
