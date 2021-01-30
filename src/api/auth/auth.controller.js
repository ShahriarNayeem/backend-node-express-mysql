const httpStatus = require("http-status");
const JWToken = require("../../libs/jwToken");
const APIError = require("../../libs/APIError");
const db = require("../../models/index");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const salt = bcrypt.genSaltSync(10);

const UsersPublicField = [
  "id",
  "name",
  "email",
  "isActive",
  "deleteFlag",
  "userRoleId",
];
/**
 * Returns jwt token if valid username and password is provided
 * @property {string} req.body.username username of user
 * @property {string} req.body.password password of user
 * @returns {<{token, user}, Error>}
 */
async function login(req, res, next) {
  try {
    const user = await db.userList.findOne({
      where: {
        email: req.body.user_name,
      },
      attributes: ["password", ...UsersPublicField],
      raw: true,
    });

    const { userRoleId } = user;

    if (userRoleId === 1) {
      res.status(400).json({
        success: false,
        msg: "Only disaster manager need to login",
      });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = JWToken.create(_.pick(user, UsersPublicField), "5d");
      return res.json({
        token,
        user: _.pick(user, UsersPublicField),
      });
    }

    throw new APIError("Authentication error!", httpStatus.UNAUTHORIZED, true);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  login,
};
