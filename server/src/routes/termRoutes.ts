import express from 'express';
import { admin, verifyToken, verifyBearerToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';

import { getAllTerms, getTerm, storeTerm, updateTerm, deleteTerm } from '../controllers/termController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllTerms)
    .post(storeTerm)
router
    .route('/:id')
    .get(getTerm)
    .put(updateTerm)
    .delete(deleteTerm)

export default router;
