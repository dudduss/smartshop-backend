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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItemByUpc = exports.searchItemDetail = exports.instantSearch = void 0;
const axios_1 = __importDefault(require("axios"));
const headers = {
    'x-app-id': '3ec716f6',
    'x-app-key': '486494c55f368a1560b396cfcb7d7f3e',
};
function instantSearch(searchString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://trackapi.nutritionix.com/v2/search/instant?query=' +
                searchString;
            const response = yield axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (e) {
            return e;
        }
    });
}
exports.instantSearch = instantSearch;
function searchItemDetail(nixItemId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://trackapi.nutritionix.com/v2/search/item?nix_item_id=' +
                nixItemId;
            const response = yield axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (e) {
            return e;
        }
    });
}
exports.searchItemDetail = searchItemDetail;
function searchItemByUpc(upc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://trackapi.nutritionix.com/v2/search/item?upc=' + upc;
            const response = yield axios_1.default.get(url, { headers });
            return response.data;
        }
        catch (e) {
            return e;
        }
    });
}
exports.searchItemByUpc = searchItemByUpc;
