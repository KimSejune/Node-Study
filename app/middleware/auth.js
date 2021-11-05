const { verifyToken } = require("../utils/auth");
const MemberSchema = require("../schema/MemberSchema");

const authenticateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "token must be included" });
    }
    const token = req.headers.authorization;
    const payload = await verifyToken(token);
    consoke.log("payload ", payload);
    const user = await MemberSchema.findById(payload._id)
      .select("-password")
      .lean()
      .exec();

    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "token is invalid" });
  }
};

module.exports = { authenticateUser };
