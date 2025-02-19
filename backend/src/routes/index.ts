import { Router } from 'express';
import { getHealthCheck } from '../controllers/healthCheck';

const router = Router();

router.get('/health', getHealthCheck);

export default router;
