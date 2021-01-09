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
exports.default = router;
