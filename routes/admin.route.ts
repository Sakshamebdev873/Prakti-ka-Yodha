import { Router, type Request, type Response } from 'express';
import { createInstitution, deleteInstitution, getAllInstitutions, inviteInstitution, updateInstitution } from '../controllers/admin/admin.controller';
import authorize from '../middleware/authorize';



const router = Router()
router.post('/add',authorize(['ADMIN']),createInstitution)
router.get('/get',authorize(['ADMIN']),getAllInstitutions)
router.patch('/update/:id',authorize(['ADMIN']),updateInstitution)
router.post('/invite-admin',authorize(['ADMIN']), inviteInstitution);
router.delete('/delete/:institutionId',authorize(['ADMIN']),deleteInstitution)
export default router