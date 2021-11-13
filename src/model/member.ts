import Conn from "../database/mysql";
import { BaseMember } from "./types/member";

export async function signUp(params: BaseMember) {
  try {
    const sql = `
    INSERT INTO member (username, password, nickname) VALUES (:username, :password, :nickname)
  `;
    return await Conn.query(sql, params);
  } catch (error) {
    throw error;
  }
}
