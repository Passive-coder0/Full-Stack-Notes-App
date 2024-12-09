require("dotenv").config();

const User = require("./modals/user.modals");

const config = require("./config.json");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const app = express();

//Mongoose
mongoose.connect(config.connectionString);
let db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));

//Express
app.use(express.json());

//origin: "*" means that any website can access the resources on your server.
app.use(
  cors({
    origin: "",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  //Destructuring the request
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Fullname is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  //Finds the user with this email
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User already exists",
    });
  }
  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Succesful",
  });
});


// Login
app.post("/login", async (req, res) => {
  // Destructuring the request
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  // Means there is no user with this email
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

app.listen(8000, () => {
  console.log("Server has started on port 8000");
});

module.exports = app;
