"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const child_process_1 = require("child_process");
const util_1 = require("util");
const router = (0, express_1.Router)();
const execAsync = (0, util_1.promisify)(child_process_1.exec);
router.get('/migrate', async (_req, res) => {
    try {
        const { stdout } = await execAsync('npx prisma migrate deploy');
        res.status(200).json({ message: 'Migración ejecutada', log: stdout });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al ejecutar la migración', error });
    }
});
exports.default = router;
