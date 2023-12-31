import express from 'express';
import { tapRfid } from '../controllers/rfidController';


const router = express.Router();

router
.route('/tap')
.post(tapRfid);

export default router;
