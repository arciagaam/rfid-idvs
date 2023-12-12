import express from 'express';
const router = express.Router();

import { authenticateUser, logoutUser, refreshUser } from '../controllers/authController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { authSchema } from '../schemas/authSchema';
import { verifyToken } from '../middlewares/auth';

router
    .route('/')
    .post(validateRequestBody(authSchema), authenticateUser);

router
    // .use(verifyToken)
    .route('/refresh')
    .post(refreshUser);

router
    .route('/logout')
    .post(logoutUser);

export default router;
