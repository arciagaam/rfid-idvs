import express from 'express';

import { verifyToken } from '../middlewares/auth';
import { getAllDepartments, getDepartment, getDepartmentWithTerm } from '../controllers/departmentController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { departmentWithTermSchema } from '../schemas/departmentSchema';

const router = express.Router();

router.use(verifyToken)

router
    .route('/')
    .get(getAllDepartments);

router
    .route('/:name')
    .get(getDepartment)
    .post(validateRequestBody(departmentWithTermSchema), getDepartmentWithTerm);

export default router;
