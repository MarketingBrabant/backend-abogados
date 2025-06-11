"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const migrate_1 = require("../utils/migrate");
const router = (0, express_1.Router)();
router.get('/migrate', async (_req, res) => {
    try {
        const result = await (0, migrate_1.runPrismaMigrate)();
        res.status(200).json({ message: 'Migración ejecutada', result });
    }
    catch (error) {
        res.status(500).json({ message: 'Error ejecutando migración', error });
    }
});
exports.default = router;
