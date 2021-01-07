"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Joi = __importStar(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const index_1 = require("../controllers/index");
const router = express_1.Router();
const validator = express_joi_validation_1.createValidator();
const postUsersBody = Joi.object({
    email: Joi.string().required(),
    passwordHash: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePictureUrl: Joi.string(),
});
//Users Routes
router.post('/users', validator.body(postUsersBody), index_1.createUser);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.delete('/users/:id', getUsers);
exports.default = router;
