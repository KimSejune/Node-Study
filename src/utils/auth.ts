import jwt from "jsonwebtoken";
import { Member, PayloadMember } from "../model/types/member";

export const newToken = (user: Member) => {
  const payload: PayloadMember = {
    username: user.username,
    id: user.id,
  };
  return jwt.sign(payload, `${process.env.SECRET_KEY}`, {
    expiresIn: process.env.EXPIRATION_DATE,
  });
};

export const verifyToken = async (token: string) => {
  const payload = await jwt.verify(token, `${process.env.SECRET_KEY}`);
  if (!payload) {
    throw new Error("Payload Not found");
  }
  return payload;
};
