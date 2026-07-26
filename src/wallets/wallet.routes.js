import { Router } from 'express';
import { getBalance, initializeWallet, addFunds } from './wallet.controller.js';
import { getBalanceValidator } from '../../middlewares/wallet-validators.js';
import { validateJWT, validateInternalSecret } from '../../middlewares/auth-validators.js';

const router = Router();

router.get('/balance', validateJWT, getBalanceValidator, getBalance);
router.post('/initialize', validateInternalSecret, initializeWallet);
router.post('/recharge', validateInternalSecret, addFunds);

export default router;
