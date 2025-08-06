import User from "../models/user.js";
import { Op } from "sequelize";

// Create a new user
export async function createUser(req, res, next) {
    try {
        const { name, email, password_hash, role, avatar_url } = req.body;
        const newUser = await User.create({ name, email, password_hash, role, avatar_url });
        return res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

// Get all users or search by name
export async function getAllUsers(req, res, next) {
    try {
        const { name } = req.query;
        if (name) {
            return await searchUserByName(req, res, next);
        }
        const users = await User.findAll({ attributes: { exclude: ["password_hash"] } });
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Get user by ID
export async function getUserById(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, { attributes: { exclude: ["password_hash"] } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Update user details
export async function updateUser(req, res, next) {
    try {
        const userId = req.params.id;
        const { name, email, passwordHash, role, avatarUrl } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.update({
            name,
            email,
            password_hash: passwordHash,
            role,
            avatar_url: avatarUrl
        });
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Delete a user
export async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

// Search users by name
export async function searchUserByName(req, res, next) {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: "Name query parameter is required" });
        }
        const users = await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: { exclude: ["password_hash"] }
        });
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}