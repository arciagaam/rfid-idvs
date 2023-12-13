import express from 'express';
const router = express.Router();

import { authenticateUser, logoutUser, refreshUser } from '../controllers/authController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { authSchema } from '../schemas/authSchema';

router
    .route('/')
    .post(validateRequestBody(authSchema), authenticateUser);

router
    .route('/refresh')
    .post(refreshUser);

router
    .route('/logout')
    .post(logoutUser);

export default router;
