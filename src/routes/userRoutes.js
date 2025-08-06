const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    searchUserByName
} = require("../controllers/userController.ts");
const authenticate = require("../middleware/auth.js");

// User routes
router.get("/search", authenticate, searchUserByName);
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;