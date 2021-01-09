"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getReviewsByItemId = exports.getReviewsByUserId = exports.updateReview = exports.createReview = void 0;
const database_1 = require("../database");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId, content, rating } = req.body;
        yield database_1.pool.query('INSERT INTO reviews (user_id, item_id, content, rating) VALUES($1, $2, $3, $4)', [userId, itemId, content, rating]);
        return res.json({ message: 'Review created succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, content, rating } = req.body;
        yield database_1.pool.query('UPDATE reviews SET content = $2, rating = $3 WHERE id = $1', [id, content, rating]);
        return res.json({ message: 'Review updated succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.updateReview = updateReview;
const getReviewsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query['userId'];
        const response = yield database_1.pool.query('SELECT * FROM reviews WHERE user_id = $1', [userId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getReviewsByUserId = getReviewsByUserId;
const getReviewsByItemId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.query['itemId'];
        const response = yield database_1.pool.query('SELECT * FROM reviews WHERE item_id = $1', [itemId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getReviewsByItemId = getReviewsByItemId;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.query['id'];
        yield database_1.pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
        return res.status(200).json('Succesfully deleted Review');
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.deleteReview = deleteReview;
