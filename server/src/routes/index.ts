import express from 'express';
import userRoutes from './userRoutes';
import studentRoutes from './studentRoutes';
import termRoutes from './termRoutes';
import authRoutes from './authRoutes';
import departmentRoutes from './departmentRoutes';
import schoolYearRoutes from './schoolYearRoutes';
import courseRoutes from './courseRoutes';
import rfidRoutes from './rfidRoutes';
import accountRoutes from './accountRoutes';

import { Request, Response } from 'express';
import { sendMail } from '../utils/mail';

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
router.use('/account', accountRoutes)

router.use('/test', async (req: Request, res: Response) => {
    await sendMail({
        to: "meynard.trinidad44@gmail.com",
        subject: "Test Email from NodeJS Nodemailer using GMail account.",
        text: "This is a test message. Do not reply.",
    }, (info) => {
        res.send(info.messageId);
    });
})

export default router;
