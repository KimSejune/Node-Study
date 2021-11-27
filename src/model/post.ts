import Conn from "../database/mysql";
import { PostInfo } from "./types/post";

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
    return await Conn.query(sql, { id });
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

// INSERT INTO hire_sales_filter
//       (cppc_member_id, is_new)
//     VALUES
//       (:cppc_member_id, :is_new)
//     ON DUPLICATE KEY UPDATE
//       is_new = :is_new
