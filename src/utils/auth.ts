import jwt from "jsonwebtoken";
import { Member, PayloadMember } from "../model/types/member";

export const newToken = (user: Member) => {
  const payload = getPayload(user);
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_DATE,
  });
};

export const refreshToken = (user: Member) => {
  const payload = getPayload(user);
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET_KEY}`, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_DATE,
  });
};

const getPayload = (user: Member): PayloadMember => {
  const { username, id } = user;
  const payload: PayloadMember = {
    username,
    id,
  };
  return payload;
};

export const verifyToken = async (token: string, key: string) => {
  try {
    const payload = (await jwt.verify(token, key)) as PayloadMember;
    if (!payload) {
      throw new Error("Payload Not found");
    }
    return payload;
  } catch (error) {
    throw error;
  }
};
