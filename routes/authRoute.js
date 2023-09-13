const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.patch("/edit", authMiddleware, isAdmin, updateUser);
router.patch("/block/:id", authMiddleware, isAdmin, blockUser);
router.patch("/unblock/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
