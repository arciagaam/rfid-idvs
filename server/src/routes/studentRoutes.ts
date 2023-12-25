import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { deleteStudent, getAllStudents, getStudent, storeStudent, updateStudent } from '../controllers/studentController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllStudents)
    .post(storeStudent);

router
    .route('/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);

export default router;
