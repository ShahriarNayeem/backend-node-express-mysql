const { Router } = require('express');

const router = Router();
const authRoutes = require('./api/auth/auth.route');

/**
 * @api {get} /api Health Check
 * @apiName Health Check
 * @apiGroup API
 * @apiVersion 1.0.0
 *
 * @apiParam none
 *
 * @apiSuccess {String} OK Success Response
 * @apiError {Object} error Error Response
 */
router.get('/', (req, res) => res.send('OK'));

/**
 * @apiDescription Mounts user routes at /users
 * @apiGroup User
 */

/**
 * @apiDescription Mounts auth routes at /auth
 * @apiGroup Auth
 */
router.use('/auth', authRoutes);

module.exports = router;
