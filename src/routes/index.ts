import { Router } from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {
  getUsersQuery,
  postUsersBody,
  postItemsBody,
  putItemsBody,
  getItemByIdQuery,
  getItemByNixIdQuery,
} from './schemas';

import {
  getUserById,
  getItemById,
  createUser,
  createItem,
  updateItem,
  getItemByNixId,
} from '../controllers/index';

const router = Router();
const validator = createValidator();

// Users Routes
router.post('/users', validator.body(postUsersBody), createUser);
router.get('/users/', validator.query(getUsersQuery), getUserById);
// router.delete('/users/', deleteUserById);

// Items Routes
router.post('/items', validator.body(postItemsBody), createItem);
router.get('/itemsById/', validator.query(getItemByIdQuery), getItemById);
router.get(
  '/itemsByNixId/',
  validator.query(getItemByNixIdQuery),
  getItemByNixId
);
router.put('/items', validator.body(putItemsBody), updateItem);

export default router;
