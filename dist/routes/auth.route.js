"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_js_1 = require("../controllers/authControllers.js");
const router = express_1.default.Router();
// --- Registration Routes ---
// Public registration for students using a join code
router.post('/register/student', authControllers_js_1.registerStudent);
// Registration for invited teachers using a unique token
router.post('/register/teacher', authControllers_js_1.registerTeacher);
// Registration for invited institution admins using a unique token
router.post('/register/institution-admin', authControllers_js_1.registerInstitutionAdmin);
// --- Session Management Routes ---
// Universal sign-in for all roles
router.post('/signin', authControllers_js_1.signIn);
// Universal sign-out
router.post('/signout', authControllers_js_1.signOut);
// Universal refresh token
router.post('/refresh-token', authControllers_js_1.refreshToken);
exports.default = router;
