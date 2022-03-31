const {loginService, registerService} = require('../services/auth')

/**
 * Registation Controller
 */

const registerController = async (req, res, next) => {
  /**
   * Request Input Sources:
   * Request body
   * Request param
   * Request Query
   * Request Headers
   * Request Cookies
   */

  const { name, email, password, accountStatus } = req.body;
  //validation Check

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  
  try {
      const user = await registerService(name, email, password)
      return res.status(201).json({ message: "User Created Successfully", user });
  } catch (err) {
    next(err);
  }
};

/**
 * Login Controller
 */

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password)
    return res.status(200).json({
      message: "Login Successful",
      token,
    });
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
