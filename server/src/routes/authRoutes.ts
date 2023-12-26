import express from 'express';
const router = express.Router();

import { authenticateUser, getCurrentUser, logoutUser, refreshUser } from '../controllers/authController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { authSchema } from '../schemas/authSchema';

router
    .route('/')
    .post(validateRequestBody(authSchema), authenticateUser);

router
    .route('/me')
    .get(getCurrentUser);

router
    .route('/refresh')
    .post(refreshUser);

router
    .route('/logout')
    .post(logoutUser);

export default router;
