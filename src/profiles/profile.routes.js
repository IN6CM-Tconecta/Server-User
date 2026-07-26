import { Router } from 'express';
import { getProfile, updateProfile } from './profile.controller.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

router.use(validateJWT);

router.get('/me', getProfile);
router.put('/me', updateProfile);

export default router;
