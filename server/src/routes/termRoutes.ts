import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';

import { termSchema } from '../schemas/termSchema';

import { getAllTerms, getTerm, storeTerm, updateTerm, deleteTerm } from '../controllers/termController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllTerms)
    .post(validateRequestBody(termSchema), storeTerm)
router
    .route('/:id')
    .get(getTerm)
    .put(validateRequestBody(termSchema), updateTerm)
    .delete(deleteTerm)

export default router;
