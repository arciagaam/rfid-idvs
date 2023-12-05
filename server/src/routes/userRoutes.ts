import express from 'express';
import { admin, protect } from '../middlewares/auth';

const router = express.Router();

router.route('/').get(protect, admin);

export default router;