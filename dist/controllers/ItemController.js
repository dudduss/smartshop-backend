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
exports.getItemDetailByNixId = exports.getAndCreateItemBySearchUpc = exports.getAndCreateItemsBySearch = exports.getItemByNixId = exports.getItemById = exports.updateItem = exports.createItem = void 0;
const database_1 = require("../database");
const utils_1 = require("../external/nutritionix/utils");
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
const getAndCreateItemsBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchString = req.query['searchString'];
        // Hit Nutrionix API here
        const response = yield utils_1.instantSearch(searchString);
        const nutritionixItems = response.branded;
        // For each item in nutrionix API, get from database. If it doesn't exist, create it and return it
        const items = yield Promise.all(nutritionixItems.map((nutritionixItem) => __awaiter(void 0, void 0, void 0, function* () { return getOrCreateItem(nutritionixItem); })));
        return res.status(200).json(items);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getAndCreateItemsBySearch = getAndCreateItemsBySearch;
const getAndCreateItemBySearchUpc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upc = req.query['upc'];
        // Hit Nutrionix API here
        const response = yield utils_1.searchItemByUpc(upc);
        const nutritionixItem = response.foods[0];
        // For the item, get from database. If it doesn't exist, create it and return it
        const item = yield getOrCreateItem(nutritionixItem);
        return res.status(200).json(item);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getAndCreateItemBySearchUpc = getAndCreateItemBySearchUpc;
function getOrCreateItem(nutritionixItem) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingItems = yield database_1.pool.query('SELECT * FROM items WHERE nix_item_id = $1', [nutritionixItem.nix_item_id]);
        if (existingItems.rows.length > 0) {
            return existingItems.rows[0];
        }
        yield database_1.pool.query('INSERT INTO items (food_name, nix_item_id, brand_name, nix_brand_id, image_url) VALUES($1, $2, $3, $4, $5)', [
            nutritionixItem.food_name,
            nutritionixItem.nix_item_id,
            nutritionixItem.brand_name,
            nutritionixItem.nix_brand_id,
            nutritionixItem.photo.thumb,
        ]);
        const createdItems = yield database_1.pool.query('SELECT * FROM items WHERE nix_item_id = $1', [nutritionixItem.nix_item_id]);
        const createdItem = createdItems.rows[0];
        return createdItem;
    });
}
const getItemDetailByNixId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nixItemId = req.query['nix_item_id'];
        const response = yield utils_1.searchItemDetail(nixItemId);
        const nutrionixItemDetail = response.foods[0];
        return res.status(200).json(nutrionixItemDetail);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getItemDetailByNixId = getItemDetailByNixId;
