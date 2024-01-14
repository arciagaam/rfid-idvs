import express from 'express';
import { reportIDValidation } from '../controllers/reportController';
const router = express.Router();


router
    .route('/validation')
    .post(reportIDValidation);

export default router;
