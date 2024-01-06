import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getAllCourses, getCoursesFromDepartments } from '../controllers/courseController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getAllCourses)
    .post(getCoursesFromDepartments);


export default router;
