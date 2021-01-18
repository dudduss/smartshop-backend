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
exports.deleteMarkedItemById = exports.getMarkedItemsByUserId = exports.createMarkedItem = void 0;
const database_1 = require("../database");
const createMarkedItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, itemId } = req.body;
        yield database_1.pool.query('INSERT INTO markedItems (user_id, item_id) VALUES($1, $2)', [userId, itemId]);
        return res.json({ message: 'MarkedItem created succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.createMarkedItem = createMarkedItem;
const getMarkedItemsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query['userId'];
        const response = yield database_1.pool.query('SELECT mi.*, i.num_reviews, i.rating, i.food_name, i.brand_name, i.image_url, i.nix_item_id FROM markedItems mi JOIN items i ON mi.item_id=i.id WHERE user_id = $1', [userId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getMarkedItemsByUserId = getMarkedItemsByUserId;
const deleteMarkedItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const markedItemId = req.query['id'];
        yield database_1.pool.query('DELETE FROM markedItems WHERE id = $1', [markedItemId]);
        return res.status(200).json('Succesfully deleted MarkedItem');
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.deleteMarkedItemById = deleteMarkedItemById;
