import express, { Request, Response, NextFunction } from "express";
import { AuthMember, BaseMember, TokenMember } from "../model/types/member";
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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const authMember: AuthMember = {
      username,
      password,
    };
    const result = await MemberService.login(authMember);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const reissuanceAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, token } = req.body;
    const tokenMember: TokenMember = {
      id,
      refreshToken: token,
    };
    const result = await MemberService.ReissuanceAccessToken(tokenMember);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get("/", get);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/token", reissuanceAccessToken);

module.exports = router;
