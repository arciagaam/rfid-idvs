import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { deleteUser, getAllUsers, getUser, resetPasswordUser, storeUser, updateUser } from '../controllers/userController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllUsers)
    .post(validateRequestBody(userSchema), storeUser);

router
    .route('/:id/reset')
    .post(resetPasswordUser)

router
    .route('/:id')
    .get(getUser)
    .put(validateRequestBody(userSchema), updateUser)
    .delete(deleteUser);

export default router;
