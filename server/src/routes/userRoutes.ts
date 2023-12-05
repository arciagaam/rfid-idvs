import express from 'express';
import { admin, protect } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { getAllUser, storeUser, updateUser } from '../controllers/UserController';

const router = express.Router();

router
    .route('/')
    // .get(protect, admin)
    .get(getAllUser)
    .post(validateRequestBody(userSchema), storeUser)

router
    .route('/:id')
    .put(validateRequestBody(userSchema), updateUser)

export default router;
