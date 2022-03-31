const router = require('express').Router();

/**
 * Get all user, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/users?sort=["by", "name"]
 * @method GET
 * @visibility Private
 */

router.get('/')

module.exports= router