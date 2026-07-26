import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const getBalanceValidator = [
    (req, res, next) => {
        req.body = req.body || {};
        if (!req.body.userId && req.user?.id) {
            req.body.userId = req.user.id;
        }
        next();
    },
    checkValidators
];

export const rechargeWalletValidator = [
    (req, res, next) => {
        req.body = req.body || {};
        if (!req.body.userId && req.user?.id) {
            req.body.userId = req.user.id;
        }
        next();
    },
    body('userId', 'El ID de usuario es obligatorio').notEmpty().isString(),

    body('monto')
        .exists().withMessage('El monto a recargar es obligatorio.')
        .isNumeric().withMessage('El monto debe ser un valor numérico.')
        .custom((value) => {
            if (value === null || value === undefined) {
                throw new Error('El monto no puede ser nulo.');
            }
            if (value <= 0) {
                throw new Error('El monto de recarga debe ser estrictamente mayor a Q0.00.');
            }
            return true;
        }),
    checkValidators
];
