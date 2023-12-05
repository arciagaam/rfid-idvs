import express from 'express';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/authenticate', authRoutes)

router.use('/users', userRoutes)

export default router;
