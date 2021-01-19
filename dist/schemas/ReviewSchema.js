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
exports.deleteReviewsQuery = exports.getReviewsByItemIdQuery = exports.getReviewsByUserIdQuery = exports.patchReviewsBody = exports.postReviewsBody = void 0;
const Joi = __importStar(require("joi"));
exports.postReviewsBody = Joi.object({
    userId: Joi.number().required(),
    itemId: Joi.number().required(),
    content: Joi.string().allow(''),
    rating: Joi.number().required(),
});
exports.patchReviewsBody = Joi.object({
    id: Joi.number().required(),
    content: Joi.string().allow(''),
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
