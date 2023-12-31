import express from 'express';
import userRoutes from './userRoutes';
import studentRoutes from './studentRoutes';
import termRoutes from './termRoutes';
import authRoutes from './authRoutes';
import departmentRoutes from './departmentRoutes';
import schoolYearRoutes from './schoolYearRoutes';
import courseRoutes from './courseRoutes';
import rfidRoutes from './rfidRoutes';

const router = express.Router();

router.get('/', (req: any, res) => {
    res.send('API is running');
});

router.use('/authenticate', authRoutes)
router.use('/users', userRoutes)
router.use('/students', studentRoutes)
router.use('/terms', termRoutes)
router.use('/departments', departmentRoutes)
router.use('/school-years', schoolYearRoutes)
router.use('/courses', courseRoutes)
router.use('/rfid', rfidRoutes)

export default router;
