"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin/admin.controller");
const authorize_1 = __importDefault(require("../middleware/authorize"));
const router = (0, express_1.Router)();
router.post('/add', (0, authorize_1.default)(['ADMIN']), admin_controller_1.createInstitution);
router.get('/get', (0, authorize_1.default)(['ADMIN']), admin_controller_1.getAllInstitutions);
router.patch('/update/:id', (0, authorize_1.default)(['ADMIN']), admin_controller_1.updateInstitution);
router.post('/invite-admin', (0, authorize_1.default)(['ADMIN']), admin_controller_1.inviteInstitution);
router.delete('/delete/:institutionId', (0, authorize_1.default)(['ADMIN']), admin_controller_1.deleteInstitution);
exports.default = router;
