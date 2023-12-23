import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { getAllSchoolYears } from '../controllers/schoolYearController';
import { getSchoolYearWithTermById } from '../controllers/termController';

const router = express.Router();

router.use(verifyToken);

router
    .route('/')
    .get(getAllSchoolYears)

router
    .route('/:id')
    .get(getSchoolYearWithTermById)

export default router;
