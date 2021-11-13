/**
 * Data Model Interfaces
 */
import bcrypt from "bcrypt";
import { BaseMember, Member } from "../model/types/member";
import * as MemberModel from "../model/member";

/**
 * Service Methods
 */

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
