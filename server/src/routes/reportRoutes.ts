import express from 'express';
import { allReportsIDValidation, reportIDValidation } from '../controllers/reportController';
const router = express.Router();


router
    .route('/validation')
    .post(reportIDValidation);

    router
    .route('/all')
    .post(allReportsIDValidation);

export default router;
