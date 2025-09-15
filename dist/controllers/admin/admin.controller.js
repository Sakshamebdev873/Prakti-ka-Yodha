"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteInstitutionAdmin = exports.deleteInstitution = exports.updateInstitution = exports.getAllInstitutions = exports.createInstitution = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../libs/prisma"));
// --- Helper Function (No changes needed, this is well-optimized for its purpose) ---
const generateUniqueJoinCode = async (name) => {
    const base = name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
    let uniqueCode = '';
    let attempts = 0;
    while (!uniqueCode && attempts < 10) {
        const suffix = Math.floor(1000 + Math.random() * 9000).toString().substring(1);
        const candidateCode = `${base}-${suffix}`;
        const existing = await prisma_1.default.institution.findUnique({ where: { joinCode: candidateCode } });
        if (!existing) {
            uniqueCode = candidateCode;
        }
        attempts++;
    }
    if (!uniqueCode)
        throw new Error('Failed to generate a unique join code.');
    return uniqueCode;
};
// --- Controller Functions (Refactored for Robustness and Consistency) ---
const createInstitution = async (req, res) => {
    const { name, type, address } = req.body;
    // Improvement: Stricter validation, including the enum check
    if (!name || !type) {
        return res.status(400).json({ message: "Institution name and type are required." });
    }
    if (!Object.values(client_1.InstitutionType).includes(type)) {
        return res.status(400).json({ message: `Invalid institution type. Must be one of: ${Object.values(client_1.InstitutionType).join(', ')}` });
    }
    try {
        const existingInstitution = await prisma_1.default.institution.findUnique({ where: { name } });
        if (existingInstitution) {
            return res.status(409).json({ message: "An institution with this name already exists." });
        }
        const joinCode = await generateUniqueJoinCode(name);
        const institution = await prisma_1.default.institution.create({
            data: { name, type, address, joinCode },
        });
        // Improvement: Use 201 Created for successful creation and standardize response
        res.status(201).json(institution);
    }
    catch (err) {
        console.error("Error creating institution:", err);
        res.status(500).json({ message: "Server error during institution creation." });
    }
};
exports.createInstitution = createInstitution;
const getAllInstitutions = async (req, res) => {
    // Optimization: Added pagination to prevent fetching all records at once
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    try {
        const institutions = await prisma_1.default.institution.findMany({
            skip,
            take: limit,
            orderBy: { name: "asc" },
        });
        const totalInstitutions = await prisma_1.default.institution.count();
        // Improvement: Return a structured response and always return 200 OK, even for an empty list
        res.status(200).json({
            data: institutions,
            currentPage: page,
            totalPages: Math.ceil(totalInstitutions / limit),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching institutions.", error });
    }
};
exports.getAllInstitutions = getAllInstitutions;
const updateInstitution = async (req, res) => {
    const { id } = req.params;
    const { name, type, address } = req.body;
    // Improvement: Allow for partial updates (e.g., only updating the name)
    const dataToUpdate = {};
    if (name)
        dataToUpdate.name = name;
    if (address)
        dataToUpdate.address = address;
    if (type) {
        if (!Object.values(client_1.InstitutionType).includes(type)) {
            return res.status(400).json({ message: `Invalid institution type.` });
        }
        dataToUpdate.type = type;
    }
    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update." });
    }
    try {
        const institution = await prisma_1.default.institution.update({
            where: { id },
            data: dataToUpdate,
        });
        res.status(200).json(institution);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating institution.", error });
    }
};
exports.updateInstitution = updateInstitution;
const deleteInstitution = async (req, res) => {
    // Improvement: Standardized param name to 'id'
    const { id } = req.params;
    try {
        await prisma_1.default.institution.delete({
            where: { id },
        });
        // Improvement: Use 204 No Content for successful deletion as nothing is returned
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete institution:", error);
        res.status(500).json({ message: "Server error during institution deletion." });
    }
};
exports.deleteInstitution = deleteInstitution;
// Renamed from inviteInstitution for clarity
const inviteInstitutionAdmin = async (req, res) => {
    const { email, institutionId } = req.body;
    if (!email || !institutionId) {
        return res.status(400).json({ message: 'Email and institutionId are required.' });
    }
    // --- THIS IS THE KEY CHANGE ---
    // The JWT payload now contains `accountId`. We use this to correctly
    // identify the inviter.
    const adminAccountId = req.user?.accountId;
    if (!adminAccountId) {
        return res.status(401).json({ message: 'Unauthorized: Admin account ID not found in token.' });
    }
    try {
        const institution = await prisma_1.default.institution.findUnique({ where: { id: institutionId } });
        if (!institution) {
            return res.status(404).json({ message: "Institution not found." });
        }
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        const token = (0, uuid_1.v4)();
        // --- THIS IS NOW LOGICALLY CORRECT ---
        // The invitation is created with a link back to the Platform Admin's Account.
        // No more workarounds are needed.
        const invitation = await prisma_1.default.teacherInvitation.create({
            data: {
                email,
                institutionId,
                token,
                expiresAt,
                // The `invitedByAccountId` now correctly points to the Admin's account ID.
                invitedByAccountId: adminAccountId,
            }
        });
        const registrationLink = `${process.env.FRONTEND_URL}/register/institution-admin?token=${token}`;
        console.log(`(Email Simulation) Sending Invite to: ${email}\nLink: ${registrationLink}`);
        res.status(201).json({ message: `Invitation sent successfully to ${email}.`, invitation });
    }
    catch (error) {
        if (error.code === 'P2002') { // Handle duplicate invitations
            return res.status(409).json({ message: 'This email has already been invited to this institution.' });
        }
        console.error("Error sending institution admin invitation:", error);
        res.status(500).json({ message: 'Server error during invitation process.' });
    }
};
exports.inviteInstitutionAdmin = inviteInstitutionAdmin;
