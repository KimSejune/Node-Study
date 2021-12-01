import Conn from "../database/mysql";
import { PostInfo, UpdateInfo } from "./types/post";

export async function getList() {
  try {
    const sql = `SELECT * FROM post`;
    return await Conn.query(sql, {});
  } catch (error) {
    throw error;
  }
}

export async function get(id: number) {
  try {
    const sql = `SELECT * FROM post WHERE id = :id`;
    const result = await Conn.query(sql, { id });
    return result ? result[0] : null;
  } catch (error) {
    throw error;
  }
}

export async function create(postInfo: PostInfo) {
  try {
    const sql = `INSERT INTO post (member_id, title, description) VALUES (:member_id, :title, :description)`;
    return await Conn.query(sql, postInfo);
  } catch (error) {
    throw error;
  }
}

export async function remove(id: number) {
  try {
    const sql = `DELETE FROM post WHERE id = :id`;
    return await Conn.query(sql, { id });
  } catch (error) {
    throw error;
  }
}

export async function update(updateInfo: UpdateInfo) {
  try {
    const sql = `
      UPDATE post 
      SET title = :title, description = :description, updated_at = NOW()
      WHERE id = :id
    `;
    return await Conn.query(sql, updateInfo);
  } catch (error) {
    throw error;
  }
}
