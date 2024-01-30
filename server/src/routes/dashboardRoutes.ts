import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getDashboardWithTerm } from '../controllers/dashboardController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .post(getDashboardWithTerm);

export default router;
