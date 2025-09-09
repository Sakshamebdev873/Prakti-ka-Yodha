"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_js_1 = require("../controllers/authControllers.js");
const authenticate_js_1 = __importDefault(require("../middleware/authenticate.js"));
const router = (0, express_1.Router)();
router.post('/register', authControllers_js_1.signUp);
router.post('/login', authControllers_js_1.signIn);
router.post('/refresh', authControllers_js_1.refreshToken);
router.post('/logout', authenticate_js_1.default, authControllers_js_1.signOut);
// Example of a protected route using the middleware
router.get('/profile', authenticate_js_1.default, (req, res) => {
    // Thanks to our type declaration, req.user is now fully typed and safe to access
    if (req.user) {
        res.json({ message: `Welcome user ${req.user.userId} with role ${req.user.role}` });
    }
});
exports.default = router;
