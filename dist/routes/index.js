"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_js_1 = __importDefault(require("./api/index.js"));
router.use('/api', index_js_1.default);
router.use((_req, res) => {
    return res.send('Wrong route!');
});
exports.default = router;
