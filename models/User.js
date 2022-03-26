const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message: (props)=>`Invalid Email ${props.value}`
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password is too short'],
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ['STUDENT']
  },
  accountStatus: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'REJECTED'],
    default: 'PENDING',
    required: true
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
