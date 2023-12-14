import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getAllDepartments, getDepartment } from '../controllers/departmentController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getAllDepartments);

router
    .route('/:name')
    .get(getDepartment);

export default router;
