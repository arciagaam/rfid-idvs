import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import {
    getAllUsers,
    getAllArchivedUsers,
    getUser,
    resetPasswordUser,
    storeUser,
    updateUser,
    deleteUser,
    restoreUser
} from '../controllers/userController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllUsers)
    .post(validateRequestBody(userSchema), storeUser);

router
    .route('/archived')
    .get(getAllArchivedUsers)

router
    .route('/:id/reset')
    .post(resetPasswordUser)

router
    .route('/:id/restore')
    .post(restoreUser);

router
    .route('/:id')
    .get(getUser)
    .put(validateRequestBody(userSchema), updateUser)
    .delete(deleteUser);

export default router;
