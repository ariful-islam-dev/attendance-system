const User = require("../models/User");
const userService = require('../services/user');
const error = require('../utils/error')

const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort, pagination, select
     */

    try{
        const users = await userService.findUsers();
        return res.status(200).json(users)
    }catch(e){
        next(e)
    }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try{
        const user = await userService.findUserByProperty("_id", userId)

        if(!user){
         throw error("User Not Found", 404)
        }
       
         res.status(200).json(user)
    }catch(err){
        next(err)
    }
};

const postUser = (req, res, next) => {};

const putUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
  getUserById,
  getUsers,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
