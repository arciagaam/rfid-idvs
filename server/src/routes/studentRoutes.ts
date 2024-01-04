import express from 'express';
import { admin, verifyToken } from '../middlewares/auth';
import { deleteStudent, getAllStudents, getStudent, storeStudent, updateStudent, linkRfid, unlinkRfid, validateStudent, triggerModal } from '../controllers/studentController';

const router = express.Router();

router.use(verifyToken);

router
    .route('/trigger')
    .post(triggerModal)
    
router.use(admin);

router
    .route('/')
    .get(getAllStudents)
    .post(storeStudent);

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
