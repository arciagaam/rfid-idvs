import express from 'express';
const router = express.Router();

import { authenticateUser, logoutUser } from '../controllers/authController';

router.route('/').post(authenticateUser);
router.route('/logout').post(logoutUser);

export default router;