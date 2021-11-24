import express, { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types/express";
import { Post } from "../model/types/post";

import auth from "../middleware/auth";

const router = express.Router();

const get = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const result: Post[] = await
    console.log("post get");
    return null;
  } catch (error) {
    next(error);
  }
};

router.get("/", auth.authenticateUser, get);

module.exports = router;
