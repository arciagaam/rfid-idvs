import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { userSchema } from '../schemas/userSchema';
import { deleteStudent, getAllStudents, getStudent, storeStudent, updateStudent, linkRfid, unlinkRfid, validateStudent, triggerModal } from '../controllers/studentController';

const router = express.Router();

router.use(verifyToken, admin);

router
    .route('/')
    .get(getAllStudents)
    .post(storeStudent);

router
    .route('/trigger')
    .post(triggerModal)
    
router
    .route('/link/:id')
    .post(linkRfid)

router
    .route('/unlink/:id')
    .post(unlinkRfid)

router
    .route('/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);

router.route('/:id/link')
    .post()

export default router;
