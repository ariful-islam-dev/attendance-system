const express = require("express");
const connectDB = require("./db");
const authenticate = require("./middleware/authenticate");

const routes = require('./routes');


const app = express();

app.use(express.json());
app.use(routes)

const port = process.env.PORT || 4000;

/**
 * Registation Process
 */



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
