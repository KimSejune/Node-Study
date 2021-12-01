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

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: memberId } = req.user;
    const { title, description } = req.body;
    const result = await PostService.create({
      member_id: memberId,
      title,
      description,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: memberId } = req.user;
    const { id } = req.params;
    const result = await PostService.remove(parseInt(id), memberId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: memberId } = req.user;
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await PostService.update({
      id: parseInt(id),
      member_id: memberId,
      title,
      description,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

router.get("/", authenticateUser, getList);
router.get("/:id", authenticateUser, get);
router.post("/", authenticateUser, create);
router.delete("/:id", authenticateUser, remove);
router.put("/:id", authenticateUser, update);

module.exports = router;
