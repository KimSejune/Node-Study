import express, { Request, Response, NextFunction } from "express";
import * as PostService from "../service/post";
import { Post } from "../model/types/post";

import { authenticateUser } from "../middleware/auth";

const router = express.Router();

const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: Post[] = await PostService.getList();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result: Post = await PostService.get(parseInt(id));
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get("/", authenticateUser, getList);
router.get("/:id", authenticateUser, get);

module.exports = router;
