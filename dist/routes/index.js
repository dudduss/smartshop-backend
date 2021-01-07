"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_joi_validation_1 = require("express-joi-validation");
const schemas_1 = require("./schemas");
const index_1 = require("../controllers/index");
const router = express_1.Router();
const validator = express_joi_validation_1.createValidator();
//Users Routes
router.post('/users', validator.body(schemas_1.postUsersBody), index_1.createUser);
router.get('/users/', index_1.getUserById);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.delete('/users/:id', getUsers);
exports.default = router;
