import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getDashboard, getDashboardWithTerm } from '../controllers/dashboardController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getDashboard)
    .post(getDashboardWithTerm);

export default router;
