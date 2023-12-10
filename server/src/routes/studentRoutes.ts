import express from 'express';
import { admin, verifyToken, verifyBearerToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { deleteStudent, getAllStudents, getStudent, storeStudent, updateStudent } from '../controllers/studentController';

const router = express.Router();

router.use(verifyBearerToken, verifyToken, admin);

router
    .route('/')
    .get(getAllStudents)
    .post(validateRequestBody(userSchema), storeStudent);

router
    .route('/:id')
    .get(getStudent)
    .put(validateRequestBody(userSchema), updateStudent)
    .delete(deleteStudent);

export default router;
