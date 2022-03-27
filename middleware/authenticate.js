const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function authenticate(req, res, next){
   
  
    try {
        let token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ message: "Unauthorize" });
        }

      token = token.split(" ")[1];

      const decode = await jwt.verify(token, "secret-key");

      const user = await User.findById(decode._id)
     
      if (!user) {
        return res.status(401).json({ message: "Unauthorize" });
      }
      // provide User Obj
      req.user = user

      next()
      
    } catch (error) {
      return res.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = authenticate