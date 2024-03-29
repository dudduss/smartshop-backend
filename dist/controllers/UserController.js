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
exports.createUser = exports.getUserById = void 0;
const database_1 = require("../database");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query['id'];
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passwordHash, firstName, lastName, profilePictureUrl, } = req.body;
        yield database_1.pool.query('INSERT INTO users (email, password_hash, first_name, last_name, profile_picture_url) VALUES($1, $2, $3, $4, $5)', [email, passwordHash, firstName, lastName, profilePictureUrl]);
        return res.json({ message: 'User created succesfully' });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.createUser = createUser;
