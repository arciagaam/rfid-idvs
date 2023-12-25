import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getAllCourses } from '../controllers/courseController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getAllCourses);

export default router;
