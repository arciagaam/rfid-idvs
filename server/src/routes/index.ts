import express from 'express';
import userRoutes from './userRoutes';
import termRoutes from './termRoutes'
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/authenticate', authRoutes)

router.use('/users', userRoutes)
router.use('/terms', termRoutes)

export default router;
