const express = require("express");
const router = express.Router();
const MemberService = require("../services/Member");

const login = async (req, res, next) => {
  try {
    const result = await MemberService.login(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const result = await MemberService.signUp(req.body);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;
