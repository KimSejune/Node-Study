const MemberSchema = require("../schema/MemberSchema");
const { newToken } = require("../utils/auth");
const Conn = require("../database/mysql");

const bcrypt = require("bcrypt");
class Member {
  constructor() {}

  async login(username, password) {
    try {
      const user = await MemberSchema.findOne({
        username,
      });
      if (!user) {
        throw new Error("Not Found User");
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        throw new Error("Not Matched Password");
      }
      const userInfo = {
        username: user.username,
        nickname: user.nickname,
        token: newToken(user),
      };

      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async signUp(username, hashedPassword, nickname) {
    try {
      // const newUser = new MemberSchema({
      //   username,
      //   password: hashedPassword,
      //   nickname,
      // });
      // return await newUser.save();
      const qparams = { username, hashedPassword, nickname };
      const sql = `
        INSERT INTO member (email, password, nickname) VALUES (:username, :hashedPassword, :nickname)
      `;
      return await Conn.query(sql, qparams);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Member();
