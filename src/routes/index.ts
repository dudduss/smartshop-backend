import { Router } from 'express';
import {
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';

import { getUsersQuery, postUsersBody } from '../schemas/UserSchema';
import {
  postItemsBody,
  patchItemsBody,
  getItemByIdQuery,
  getItemByNixIdQuery,
} from '../schemas/ItemSchema';
import {
  postMarkedItemsBody,
  getMarkedItemsByUserIdQuery,
  deleteMarkedItemQuery,
} from '../schemas/MarkedItemSchema';
import {
  postReviewsBody,
  patchReviewsBody,
  getReviewsByUserIdQuery,
  getReviewsByItemIdQuery,
  deleteReviewsQuery,
} from '../schemas/ReviewSchema';

import { getUserById, createUser } from '../controllers/UserController';
import {
  getItemById,
  createItem,
  updateItem,
  getItemByNixId,
} from '../controllers/ItemController';
import {
  createMarkedItem,
  getMarkedItemsByUserId,
  deleteMarkedItemById,
} from '../controllers/MarkedItemController';
import {
  createReview,
  updateReview,
  getReviewsByUserId,
  getReviewsByItemId,
  deleteReview,
} from '../controllers/ReviewController';

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
router.patch('/items', validator.body(patchItemsBody), updateItem);

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
  '/markedItems',
  validator.query(deleteMarkedItemQuery),
  deleteMarkedItemById
);

// Reviews Routes
router.post('/reviews', validator.body(postReviewsBody), createReview);
router.patch('/reviews', validator.body(patchReviewsBody), updateReview);
router.get(
  '/reviewsByUserId/',
  validator.query(getReviewsByUserIdQuery),
  getReviewsByUserId
);
router.get(
  '/reviewsByItemId/',
  validator.query(getReviewsByItemIdQuery),
  getReviewsByItemId
);
router.delete('/reviews', validator.query(deleteReviewsQuery), deleteReview);

export default router;
