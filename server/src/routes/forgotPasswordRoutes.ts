import express from 'express';
const router = express.Router();

import { sendCodeToEmail, verifyCode, changePassword } from '../controllers/forgotPasswordController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema';

router
    .route('/')
    .post(sendCodeToEmail);

router
    .route('/verify')
    .post(verifyCode);

router
    .route('/change-password')
    .post(validateRequestBody(forgotPasswordSchema), changePassword);

export default router;
