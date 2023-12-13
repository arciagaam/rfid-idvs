import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getAllDepartments } from '../controllers/departmentController';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getAllDepartments);

export default router;
