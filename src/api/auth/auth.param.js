const Joi = require("joi");

module.exports = {
  /**
   * @apiName User Login
   * @apiGroup Auth
   */
  login: {
    body: {
      user_name: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
