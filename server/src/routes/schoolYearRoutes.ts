import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { getAllSchoolYears } from '../controllers/schoolYearController';

const router = express.Router();

router.use(verifyToken);

router
    .route('/')
    .get(getAllSchoolYears)

export default router;
