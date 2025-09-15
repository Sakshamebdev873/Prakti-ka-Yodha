"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
// 1. Import BOTH middleware functions for security
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
// 2. Import your controller functions
// Note: I've used the clearer function name `inviteInstitutionAdmin` as in previous examples
const admin_controller_js_1 = require("../controllers/admin/admin.controller.js");
const router = express_1.default.Router();
// 3. --- CRITICAL SECURITY STEP ---
// This line protects EVERY route defined in this file.
// It ensures that for any request, the server will first run `authenticate` (to check for a valid login token)
// and THEN run `authorize` (to check if the user's role is specifically 'ADMIN').
router.use(auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)([client_1.Role.ADMIN]));
// 4. --- RESTful Routes for Institutions ---
// The routes have been updated to follow standard API design conventions.
// GET /api/admin/institutions -> Get a list of all institutions
// POST /api/admin/institutions -> Create a new institution
router.route('/institutions')
    .get(admin_controller_js_1.getAllInstitutions)
    .post(admin_controller_js_1.createInstitution);
// GET /api/admin/institutions/:id -> (Optional) Get a single institution's details
// PUT /api/admin/institutions/:id -> Update an institution
// DELETE /api/admin/institutions/:id -> Delete an institution
router.route('/institutions/:id')
    .put(admin_controller_js_1.updateInstitution) // Using PUT for updates is a common REST convention
    .delete(admin_controller_js_1.deleteInstitution);
// 5. --- Custom Action Route ---
// This is for a specific action that doesn't fit the standard Create/Read/Update/Delete pattern.
// POST /api/admin/institutions/invite-admin -> Send an invitation for a user to become an Institution Admin
router.post('/institutions/invite-admin', admin_controller_js_1.inviteInstitutionAdmin);
exports.default = router;
