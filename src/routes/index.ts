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
  deleteMarkedItemQuery,
  postReviewsBody,
  putReviewsBody,
  getReviewsByUserIdQuery,
  getReviewsByItemIdQuery,
  deleteReviewsQuery,
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
  createReview,
  updateReview,
  getReviewsByUserId,
  getReviewsByItemId,
  deleteReview,
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
  '/markedItems',
  validator.query(deleteMarkedItemQuery),
  deleteMarkedItemById
);

// Reviews Routes
router.post('/reviews', validator.body(postReviewsBody), createReview);
router.put('/reviews', validator.body(putReviewsBody), updateReview);
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
