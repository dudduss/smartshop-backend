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
exports.getItemByNixId = exports.getItemById = exports.updateItem = exports.createItem = void 0;
const database_1 = require("../database");
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodName, nix_item_id, brandName, nix_brand_id, imageUrl, } = req.body;
        yield database_1.pool.query('INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id, image_url) VALUES($1, $2, $3, $4, $5)', [foodName, nix_item_id, brandName, nix_brand_id, imageUrl]);
        return res.json({ message: 'Item created succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, numReviews, rating } = req.body;
        yield database_1.pool.query('UPDATE items SET num_reviews = $2, rating = $3 WHERE id = $1', [id, numReviews, rating]);
        return res.json({ message: 'Item updated succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.updateItem = updateItem;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.query['id'];
        const response = yield database_1.pool.query('SELECT * FROM items WHERE id = $1', [itemId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getItemById = getItemById;
const getItemByNixId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nixId = req.query['nix_item_id'];
        const response = yield database_1.pool.query('SELECT * FROM items WHERE nix_item_id = $1', [nixId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getItemByNixId = getItemByNixId;
