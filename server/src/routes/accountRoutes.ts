import express from 'express';
const router = express.Router();

import { updateAccount } from '../controllers/accountController';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { accountSchema } from '../schemas/accountSchema';

router
    .route('/')
    .put(validateRequestBody(accountSchema), updateAccount);

export default router;
