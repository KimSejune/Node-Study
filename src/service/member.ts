/**
 * Data Model Interfaces
 */
import bcrypt from "bcrypt";
import {
  AuthMember,
  BaseMember,
  Member,
  PayloadMember,
  TokenMember,
} from "../model/types/member";
import * as MemberModel from "../model/member";
import { newToken, refreshToken, verifyToken } from "../utils/auth";
/**
 * Service Methods
 */

export async function login(authMember: AuthMember) {
  try {
    const { username, password } = authMember;
    const user: Member = await getUserByUsername(username);
    if (!user) {
      throw new Error("User Not Found");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new Error("User Password incorrect!");
    }
    const rToken = refreshToken(user);
    const tokenMember: TokenMember = {
      id: user.id,
      refreshToken: rToken,
    };
    await MemberModel.setMemberRefreshToken(tokenMember);

    const memberInfo = {
      username: user.username,
      nickname: user.nickname,
      accessToken: newToken(user),
      refreshToken: rToken,
    };
    return memberInfo;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username: string): Promise<Member> {
  const user = await MemberModel.get(username);
  return user ? user : null;
}

export async function signUp(params: BaseMember) {
  try {
    const { username, password, nickname } = params;
    const hashedPassword = await bcrypt.hash(password, 10);
    const member: BaseMember = {
      username,
      password: hashedPassword,
      nickname: nickname,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return await MemberModel.signUp(member);
  } catch (error) {
    throw error;
  }
}

// refresh token을 통하여 access token 재발급
export async function ReissuanceAccessToken(tokenMember: TokenMember) {
  try {
    const { id, refreshToken } = tokenMember;
    const payload: PayloadMember = await verifyToken(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET_KEY}`
    );
    if (payload.id !== id) {
      throw new Error("Token Not Match!");
    }
    const member = await MemberModel.findById(id);
    if (!member) {
      throw new Error("User Not Found");
    }
    if (refreshToken !== member.refreshToken) {
      throw new Error("Refresh Token Not Matched");
    }

    const memberInfo = {
      username: member.username,
      nickname: member.nickname,
      accessToken: newToken(member),
      refreshToken: refreshToken,
    };
    return memberInfo;
  } catch (error) {
    throw error;
  }
}
