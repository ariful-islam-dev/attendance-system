const User = require("../models/User");
const userService = require("../services/user");
const authService = require("../services/auth");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User Not Found", 404);
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const putUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try{
        const user = await userService.findUserByProperty("_id", userId)
        if(!user){
           throw error('User Not Found', 404)
        }
      await user.remove();
        res.status(203).json({message: "User Deleted successfully"})
    
    }catch(err){
        next(err)
    }
};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
