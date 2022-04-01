const userController = require("../Controllers/users");

const router = require("express").Router();

/**
 * Get user by id or email
 * @method GET
 */

 router.get("/:userId", userController.getUserById );

 /**
 * update user by id
 * @method PUT
 */

router.put("/:userId", userController.putUserById);
 /**
 * update user by id
 * @method PATCH
 */

router.patch("/:userId", userController.patchUserById);

 /**
 * delete user by id
 * @method Delete
 */

router.delete("/:userId", userController.deleteUserById);
/**
 * Get all user, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by", "name"]
 * @method GET
 * @visibility Private
 */


router.get("/", userController.getUsers);

/**
 * Crate a new user
 */
router.post("/", userController.postUser);



module.exports = router;
