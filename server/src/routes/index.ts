import express from 'express';

import authRoutes from './authRoutes';
import forgotPasswordRoutes from './forgotPasswordRoutes';

import userRoutes from './userRoutes';
import studentRoutes from './studentRoutes';
import termRoutes from './termRoutes';
import departmentRoutes from './departmentRoutes';
import schoolYearRoutes from './schoolYearRoutes';
import courseRoutes from './courseRoutes';
import rfidRoutes from './rfidRoutes';
import accountRoutes from './accountRoutes';
import dashboardRoutes from './dashboardRoutes';
import reportRoutes from './reportRoutes'


const router = express.Router();

router.get('/', (req: any, res) => {
    res.send('API is running');
});

router.use('/authenticate', authRoutes)
router.use('/forgot-password', forgotPasswordRoutes)

router.use('/dashboard', dashboardRoutes)
router.use('/users', userRoutes)
router.use('/students', studentRoutes)
router.use('/terms', termRoutes)
router.use('/departments', departmentRoutes)
router.use('/school-years', schoolYearRoutes)
router.use('/courses', courseRoutes)
router.use('/rfid', rfidRoutes)
router.use('/account', accountRoutes)
router.use('/reports', reportRoutes)

export default router;
