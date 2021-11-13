import jwt from "jsonwebtoken";
import { Member } from "../model/types/member";

export const newToken = (user: Member) => {
  const payload = {
    username: user.username,
    id: user.id,
  };
  return jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: process.env.EXPIRATION_DATE,
  });
};
