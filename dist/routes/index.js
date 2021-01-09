"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const schemas_1 = require("./schemas");
const index_1 = require("../controllers/index");
const router = express_1.Router();
const validator = express_joi_validation_1.createValidator();
// Users Routes
router.post('/users', validator.body(schemas_1.postUsersBody), index_1.createUser);
router.get('/users/', validator.query(schemas_1.getUsersQuery), index_1.getUserById);
// router.delete('/users/', deleteUserById);
// Items Routes
router.post('/items', validator.body(schemas_1.postItemsBody), index_1.createItem);
router.get('/itemsById/', validator.query(schemas_1.getItemByIdQuery), index_1.getItemById);
router.get('/itemsByNixId/', validator.query(schemas_1.getItemByNixIdQuery), index_1.getItemByNixId);
router.patch('/items', validator.body(schemas_1.patchItemsBody), index_1.updateItem);
// MarkedItems Routes
router.post('/markedItems', validator.body(schemas_1.postMarkedItemsBody), index_1.createMarkedItem);
router.get('/markedItemsByUserId/', validator.query(schemas_1.getMarkedItemsByUserIdQuery), index_1.getMarkedItemsByUserId);
router.delete('/markedItems', validator.query(schemas_1.deleteMarkedItemQuery), index_1.deleteMarkedItemById);
// Reviews Routes
router.post('/reviews', validator.body(schemas_1.postReviewsBody), index_1.createReview);
router.patch('/reviews', validator.body(schemas_1.patchReviewsBody), index_1.updateReview);
router.get('/reviewsByUserId/', validator.query(schemas_1.getReviewsByUserIdQuery), index_1.getReviewsByUserId);
router.get('/reviewsByItemId/', validator.query(schemas_1.getReviewsByItemIdQuery), index_1.getReviewsByItemId);
router.delete('/reviews', validator.query(schemas_1.deleteReviewsQuery), index_1.deleteReview);
exports.default = router;
