import express, { Request, Response, NextFunction } from "express";
import { BaseMember } from "../model/types/member";
import * as MemberService from "../service/member";
const router = express.Router();

const get = (req: Request, res: Response, next: NextFunction) => {
  res.send("get...");
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member: BaseMember = req.body;
    const result = await MemberService.signUp(member);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get("/", get);
router.post("/signup", signUp);

module.exports = router;
