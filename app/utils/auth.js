const jwt = require("jsonwebtoken");

const newToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRATION_DATE,
  });
};

const verifyToken = async (token) => {
  console.log("toekn", token);
  const payload = await jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    throw new Error("Payload Not found");
  }
  return payload;
};

module.exports = { newToken, verifyToken };
