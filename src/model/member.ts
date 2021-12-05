import Conn from "../database/mysql";
import { BaseMember } from "./types/member";

export async function get(username: string) {
  try {
    const sql = `SELECT * FROM member WHERE username = :username`;
    const result = await Conn.query(sql, { username });
    return result ? result[0] : null;
  } catch (error) {
    throw error;
  }
}

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

export async function findById(id: number) {
  try {
    const sql = `
      SELECT * FROM member WHERE id = :id
    `;
    const result = await Conn.query(sql, { id });
    return result ? result[0] : null;
  } catch (error) {
    throw error;
  }
}

export async function setMemberRefreshToken(id: number, refreshToken: string) {
  try {
    const sql = `
      UPDATE member SET refreshToken = :refreshToken
      WHERE id = :id
    `;
    return await Conn.query(sql, { id, refreshToken });
  } catch (error) {
    throw error;
  }
}
