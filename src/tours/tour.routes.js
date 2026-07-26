import { Router } from 'express';
import { planTour, getUserTours } from './tour.controller.js';
import { planTourValidator } from '../../middlewares/tour-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

router.use(validateJWT);

router.get('/history', getUserTours);
router.post('/plan', planTourValidator, planTour);

export default router;
