import Conn from "../database/mysql";

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
