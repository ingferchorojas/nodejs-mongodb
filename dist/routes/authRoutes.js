"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
router.post("/signup", usersController_1.signup);
router.post("/login", usersController_1.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map