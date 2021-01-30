const { Router } = require('express');
const { validate } = require('express-validation');
const authParam = require('./auth.param');
const authCtrl = require('./auth.controller');

const router = Router();

router
    .route('/login')
/**
   * @api {post} /api/auth/login User Login
   * @apiName User Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} email        Email user
   * @apiParam (body) {String} password     Password of user
   *
   * @apiSuccess {String} token               JWT token
   * @apiSuccess {Object} user                Details of user
   * @apiSuccess {String}   users.id          Users unique Id
   * @apiSuccess {String}   users.name        Name of user
   * @apiSuccess {String}   users.email       Email  of user
   * @apiSuccess {String}   users.deleteFlag  Delete flag  of user
   * @apiSuccess {String}   users.userRoleId  Role Id of user
   *
   *
   * @apiError {Object} error Error response
   */
    .post(validate(authParam.login), authCtrl.login);

module.exports = router;
