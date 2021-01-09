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
exports.deleteReviewsQuery = exports.getReviewsByItemIdQuery = exports.getReviewsByUserIdQuery = exports.putReviewsBody = exports.postReviewsBody = exports.deleteMarkedItemQuery = exports.getMarkedItemsByUserIdQuery = exports.postMarkedItemsBody = exports.getItemByNixIdQuery = exports.getItemByIdQuery = exports.putItemsBody = exports.postItemsBody = exports.getUsersQuery = exports.postUsersBody = void 0;
const Joi = __importStar(require("joi"));
// Users Schemas
exports.postUsersBody = Joi.object({
    email: Joi.string().required(),
    passwordHash: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePictureUrl: Joi.string(),
});
exports.getUsersQuery = Joi.object({ id: Joi.number().required() });
// Items Schemas
exports.postItemsBody = Joi.object({
    numReviews: Joi.number(),
    rating: Joi.number(),
    foodName: Joi.string().required(),
    nix_item_id: Joi.string().required(),
    brandName: Joi.string(),
    nix_brand_id: Joi.string(),
});
exports.putItemsBody = Joi.object({
    id: Joi.number().required(),
    numReviews: Joi.number().required(),
    rating: Joi.number().required(),
});
exports.getItemByIdQuery = Joi.object({ id: Joi.number().required() });
exports.getItemByNixIdQuery = Joi.object({
    nix_item_id: Joi.string().required(),
});
// MarkedItems Schemas
exports.postMarkedItemsBody = Joi.object({
    userId: Joi.number().required(),
    itemId: Joi.number().required(),
});
exports.getMarkedItemsByUserIdQuery = Joi.object({
    userId: Joi.number().required(),
});
exports.deleteMarkedItemQuery = Joi.object({
    id: Joi.number().required(),
});
// Reviews Schemas
exports.postReviewsBody = Joi.object({
    userId: Joi.number().required(),
    itemId: Joi.number().required(),
    content: Joi.string(),
    rating: Joi.number().required(),
});
exports.putReviewsBody = Joi.object({
    id: Joi.number().required(),
    content: Joi.string(),
    rating: Joi.number().required(),
});
exports.getReviewsByUserIdQuery = Joi.object({
    userId: Joi.number().required(),
});
exports.getReviewsByItemIdQuery = Joi.object({
    itemId: Joi.string().required(),
});
exports.deleteReviewsQuery = Joi.object({
    id: Joi.string().required(),
});
