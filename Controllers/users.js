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

const putUserById = async (req, res, next) => {
  const userId = req.params.userId;
    const {name,email, roles, accountStatus }=req.body;

    try{
      const user = await userService.updateUser(userId, {name,email, roles, accountStatus})
      if(!user){
        throw error('User Not Found', 404)
     }
     return res.status(200).json({message: "User Update Successful",user})
    }catch(e){
      next(e)
    }
};

const patchUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const {name, roles, accountStatus }=req.body;

    try{
        const user = await userService.findUserByProperty("_id", userId)
        if(!user){
            throw error('User Not Found', 404)
         }

         user.name = name ?? user.name;
         user.roles = roles ?? user.roles;
         user.accountStatus = accountStatus ?? user.accountStatus;

         await user.save();
         return res.status(200).json({message: "User update successful", user})
    }catch(e){
        next(e)
    }
};

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
