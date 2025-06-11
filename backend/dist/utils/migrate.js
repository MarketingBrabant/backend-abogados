"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPrismaMigrate = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const runPrismaMigrate = async () => {
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    if (stderr) {
        throw new Error(stderr);
    }
    return stdout;
};
exports.runPrismaMigrate = runPrismaMigrate;
