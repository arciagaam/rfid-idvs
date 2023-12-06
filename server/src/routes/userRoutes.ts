import express from 'express';
import { admin, verifyToken, verifyBearerToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { deleteUser, getAllUser, getUser, storeUser, updateUser } from '../controllers/UserController';

const router = express.Router();

router.use(verifyBearerToken);
router.use(verifyToken);
router.use(admin);

router
    .route('/')
    .get(getAllUser)
    .post(validateRequestBody(userSchema), storeUser);

router
    .route('/:id')
    .get(getUser)
    .put(validateRequestBody(userSchema), updateUser)
    .delete(deleteUser);

export default router;
