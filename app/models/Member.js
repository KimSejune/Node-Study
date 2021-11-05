const MemberSchema = require("../schema/MemberSchema");
const { newToken } = require("../utils/auth");

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
      const newUser = new MemberSchema({
        username,
        password: hashedPassword,
        nickname,
      });
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Member();
