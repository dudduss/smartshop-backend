import { Router } from 'express';

import { getUsers, getUserById, createUser } from '../controllers/index';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
// router.delete('/users/:id', getUsers);

export default router;
