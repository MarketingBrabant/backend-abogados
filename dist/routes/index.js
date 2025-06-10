"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const migrate_routes_1 = __importDefault(require("./migrate.routes")); // 👈 Importamos
const router = (0, express_1.Router)();
router.use('/', migrate_routes_1.default); // 👈 Montamos la ruta directamente
exports.default = router;
