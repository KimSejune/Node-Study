import express, { Request, Response, NextFunction } from "express";
import * as PostService from "../service/post";
import { Post } from "../model/types/post";

import { authenticateUser } from "../middleware/auth";

const router = express.Router();

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: Post[] = await PostService.get();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get("/", authenticateUser, get);

module.exports = router;
