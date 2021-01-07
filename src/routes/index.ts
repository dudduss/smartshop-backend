import { Router } from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import { getUsersQuery, postUsersBody } from './schemas';

import { getUsers, getUserById, createUser } from '../controllers/index';

const router = Router();
const validator = createValidator();

//Users Routes
router.post('/users', validator.body(postUsersBody), createUser);
router.get('/users/', getUserById);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.delete('/users/:id', getUsers);

export default router;
