const bcrypt = require("bcrypt");
const MemberDbModel = require("../models/Member");

class Member {
  constructor() {}

  async login(params) {
    try {
      const { username, password } = params;
      return await MemberDbModel.login(username, password);
    } catch (error) {
      throw error;
    }
  }

  async signUp(params) {
    try {
      const { username, password, nickname } = params;
      const hashedPassword = await bcrypt.hash(password, 10);
      return await MemberDbModel.signUp(username, hashedPassword, nickname);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Member();
