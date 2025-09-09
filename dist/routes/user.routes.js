"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middleware/authenticate")); // Your authentication middleware
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.get('/me', authenticate_1.default, userControllers_1.getUserProfile);
router.patch('/me', authenticate_1.default, userControllers_1.updateUserProfile);
router.post('/me/change-password', authenticate_1.default, userControllers_1.changePassword);
exports.default = router;
