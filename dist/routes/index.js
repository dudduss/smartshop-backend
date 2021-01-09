"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const UserSchema_1 = require("../schemas/UserSchema");
const ItemSchema_1 = require("../schemas/ItemSchema");
const MarkedItemSchema_1 = require("../schemas/MarkedItemSchema");
const ReviewSchema_1 = require("../schemas/ReviewSchema");
const UserController_1 = require("../controllers/UserController");
const ItemController_1 = require("../controllers/ItemController");
const MarkedItemController_1 = require("../controllers/MarkedItemController");
const ReviewController_1 = require("../controllers/ReviewController");
const router = express_1.Router();
const validator = express_joi_validation_1.createValidator();
// Users Routes
router.post('/users', validator.body(UserSchema_1.postUsersBody), UserController_1.createUser);
router.get('/users/', validator.query(UserSchema_1.getUsersQuery), UserController_1.getUserById);
// router.delete('/users/', deleteUserById);
// Items Routes
router.post('/items', validator.body(ItemSchema_1.postItemsBody), ItemController_1.createItem);
router.get('/itemsById/', validator.query(ItemSchema_1.getItemByIdQuery), ItemController_1.getItemById);
router.get('/itemsByNixId/', validator.query(ItemSchema_1.getItemByNixIdQuery), ItemController_1.getItemByNixId);
router.patch('/items', validator.body(ItemSchema_1.patchItemsBody), ItemController_1.updateItem);
// MarkedItems Routes
router.post('/markedItems', validator.body(MarkedItemSchema_1.postMarkedItemsBody), MarkedItemController_1.createMarkedItem);
router.get('/markedItemsByUserId/', validator.query(MarkedItemSchema_1.getMarkedItemsByUserIdQuery), MarkedItemController_1.getMarkedItemsByUserId);
router.delete('/markedItems', validator.query(MarkedItemSchema_1.deleteMarkedItemQuery), MarkedItemController_1.deleteMarkedItemById);
// Reviews Routes
router.post('/reviews', validator.body(ReviewSchema_1.postReviewsBody), ReviewController_1.createReview);
router.patch('/reviews', validator.body(ReviewSchema_1.patchReviewsBody), ReviewController_1.updateReview);
router.get('/reviewsByUserId/', validator.query(ReviewSchema_1.getReviewsByUserIdQuery), ReviewController_1.getReviewsByUserId);
router.get('/reviewsByItemId/', validator.query(ReviewSchema_1.getReviewsByItemIdQuery), ReviewController_1.getReviewsByItemId);
router.delete('/reviews', validator.query(ReviewSchema_1.deleteReviewsQuery), ReviewController_1.deleteReview);
exports.default = router;
