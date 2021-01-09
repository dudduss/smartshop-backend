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
  postMarkedItemsBody,
  getMarkedItemsByUserIdQuery,
  deleteMarkedItemByIdQuery,
} from './schemas';

import {
  getUserById,
  getItemById,
  createUser,
  createItem,
  updateItem,
  getItemByNixId,
  createMarkedItem,
  getMarkedItemsByUserId,
  deleteMarkedItemById,
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

// MarkedItems Routes
router.post(
  '/markedItems',
  validator.body(postMarkedItemsBody),
  createMarkedItem
);
router.get(
  '/markedItemsByUserId/',
  validator.query(getMarkedItemsByUserIdQuery),
  getMarkedItemsByUserId
);
router.delete(
  '/markedItemsById',
  validator.query(deleteMarkedItemByIdQuery),
  deleteMarkedItemById
);

export default router;
