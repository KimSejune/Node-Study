import Conn from "../database/mysql";

export async function get() {
  try {
    const sql = `SELECT * FROM post`;
    return await Conn.query(sql, {});
  } catch (error) {
    throw error;
  }
}
