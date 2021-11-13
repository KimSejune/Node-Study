/**
 * Data Model Interfaces
 */
import bcrypt from "bcrypt";
import { AuthMember, BaseMember, Member } from "../model/types/member";
import * as MemberModel from "../model/member";
import { newToken } from "../utils/auth";
/**
 * Service Methods
 */

export async function login(params: AuthMember) {
  try {
    const { username, password } = params;
    const user: Member = await getUserByUsername(username);
    if (!user) {
      throw new Error("User Not Found");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new Error("User Password incorrect!");
    }

    const memberInfo = {
      username: user.username,
      nickname: user.nickname,
      token: newToken(user),
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
