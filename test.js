const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/attendanceSystem", {
    serverSelectionTimeoutMS: 1000,
  })
  .then(async() => {
    console.log("Database Connected Successfully");
   await createUser({
      name: "Johirul Islam",
      email: "johirul@gmail.com",
    });
    await createUser({
      name: "Rupali",
      email: "rupa@gmail.com",
    });
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(error);
  });

const Schema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", Schema);

async function createUser(data) {
  const user = new User({ ...data });
  await user.save();
  return user;
}
