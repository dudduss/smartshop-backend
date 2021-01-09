import { Router } from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import { getUsersQuery, postUsersBody, postItemsBody } from './schemas';

import { getUserById, createUser, createItem } from '../controllers/index';

const router = Router();
const validator = createValidator();

// Users Routes
router.post('/users', validator.body(postUsersBody), createUser);
router.get('/users/', validator.query(getUsersQuery), getUserById);
// router.delete('/users/', deleteUserById);

// Items Routes
router.post('/items', validator.body(postItemsBody), createItem);

export default router;
