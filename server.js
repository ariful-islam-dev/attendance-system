const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json());

const port = process.env.PORT || 4000;

/**
 * Registation Process
 */

app.post("/register", async (req, res, next) => {
  /**
   * Request Input Sources:
   * Request body
   * Request param
   * Request Query
   * Request Headers
   * Request Cookies
   */

  const { name, email, password, accountStatus } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    user = new User({ name, email, password, accountStatus });

    //Password Hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (err) {
    next(err);
  }
});

/**
 * Login Process
 *
 */

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credential",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credential",
      });
    }

    delete user._doc.password;

    // Generate and return JWT
    const token = await jwt.sign(user._doc, "secret-key", { expiresIn: "2h" });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/private" ,authenticate, async (req, res, next) => {
  console.log(req.user);
  return res.status(200).json({ message: "I am a private Route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am a public Route" });
});

app.get("/", (req, res) => {
  const obj = {
    name: "Ariful Islam",
    email: "arifulislam@xample.com",
  };
  res.json(obj);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error Occurs" });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`I am listening on port  ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
