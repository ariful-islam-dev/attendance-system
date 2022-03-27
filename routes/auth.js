const { registerController, loginController } = require('../Controllers/auth');

const router = require('express').Router();

router.post("/register", registerController);


router.post("/login", loginController); 




module.exports = router