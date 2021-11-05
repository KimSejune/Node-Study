const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: String,
  insertedDate: { type: Date, default: Date.now },
});

const MemberSchema = mongoose.model("Users", memberSchema);

module.exports = MemberSchema;
