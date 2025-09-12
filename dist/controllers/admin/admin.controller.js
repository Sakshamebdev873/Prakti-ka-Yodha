"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstitution = exports.updateInstitution = exports.getAllInstitutions = exports.createInstitution = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../libs/prisma"));
const generateUniqueJoinCode = async (name) => {
    // 1. Create a short, clean base from the institution name (e.g., "Greenwood High" -> "GREE")
    const base = name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
    let uniqueCode = '';
    let attempts = 0;
    // 2. Loop until a unique code is found (to prevent collisions)
    while (!uniqueCode && attempts < 10) {
        // Generate a random 3-digit number
        const suffix = Math.floor(1000 + Math.random() * 9000).toString().substring(1);
        const candidateCode = `${base}-${suffix}`;
        // 3. Check if this code already exists in the database
        const existing = await prisma_1.default.institution.findUnique({
            where: { joinCode: candidateCode },
        });
        // If it doesn't exist, we've found our unique code!
        if (!existing) {
            uniqueCode = candidateCode;
        }
        attempts++;
    }
    // If we couldn't find a unique code after 10 tries, throw an error
    if (!uniqueCode) {
        throw new Error('Failed to generate a unique join code.');
    }
    return uniqueCode;
};
const createInstitution = async (req, res) => {
    const { name, type, address } = req.body;
    if (!name || !type) {
        return res
            .status(400)
            .json({ message: "Institution name and type are required" });
    }
    try {
        const existingInstitution = await prisma_1.default.institution.findUnique({
            where: { name },
        });
        if (existingInstitution) {
            return res
                .status(400)
                .json({ message: "An institution with this name is already exists" });
        }
        const joinCode = await generateUniqueJoinCode(name);
        const institution = await prisma_1.default.institution.create({
            data: { name, type: type, address, joinCode },
        });
        res.status(200).json({ institution });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating institution .", err });
    }
};
exports.createInstitution = createInstitution;
const getAllInstitutions = async (req, res) => {
    try {
        const institutions = await prisma_1.default.institution.findMany({
            orderBy: { name: "asc" },
        });
        if (institutions.length === 0) {
            return res.status(400).json({ msg: "no institution exists" });
        }
        res.status(200).json({ institutions });
    }
    catch (error) {
        res.status(500).json({ msg: "Error fetching institutions .", error });
    }
};
exports.getAllInstitutions = getAllInstitutions;
const updateInstitution = async (req, res) => {
    const { id } = req.params;
    const { name, type, address } = req.body;
    if (!type || !Object.values(client_1.InstitutionType).includes(type)) {
        return res.status(400).json({
            message: `Invalid institution type. Must be one of: ${Object.values(client_1.InstitutionType).join(", ")}`,
        });
    }
    if (!name || !type || !address) {
        return res.status(400).json({ msg: "Please fill all fields..." });
    }
    if (typeof name !== "string" || typeof address !== "string") {
        return res.status(400).json({ msg: "Fields should be string.." });
    }
    try {
        const institution = await prisma_1.default.institution.update({
            where: { id },
            data: { name, type: type, address },
        });
        res.status(200).json({ institution });
    }
    catch (error) {
        res.status(500).json({ msg: "Error updating institution.", error });
    }
};
exports.updateInstitution = updateInstitution;
const deleteInstitution = async (req, res) => {
    const { institutionId } = req.params;
    if (!institutionId) {
        return res.status(400).json({ msg: "Please provide the institution Id" });
    }
    try {
        await prisma_1.default.institution.delete({
            where: { id: institutionId },
        });
        res.status(200).json({ msg: "Institution deleted Successfully" });
    }
    catch (error) {
        console.error("Failed to delete Institution.", error);
        res.status(500).json({ msg: "Server error during institution deletion" });
    }
};
exports.deleteInstitution = deleteInstitution;
