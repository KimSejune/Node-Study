const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");

const list = async (req, res, next) => {
  try {
    console.log("req.user :", req.user);
    res.send("chat list");
  } catch (error) {
    next(error);
  }
};

router.get("/list", authenticateUser, list);

module.exports = router;
