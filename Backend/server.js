require("dotenv").config();

const User = require("./models/user.models");
const Note = require("./models/notes.model");
const mongoose = require("mongoose");

const config = require("./config");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const cors = require("cors");
const express = require("express");
const app = express();

//Mongoose
mongoose.connect(config.connectionString);
let db = mongoose.connection;
db.once("open", () => console.log("Connected to database"));

//Express parser
app.use(express.json());

// Will allow any website to access the resources on my server.
app.use(cors());

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
  console.log("Request Body:", req.body);


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
      message: "Invalid Email or Password",
    });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(401).json({ message: "No user with this ID" });
  }

  return res.json({
    user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id },
    message: "Retreived user successfully",
  });
});

// Add a Note (Fixed the bug req.user was not destructured)
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const  { user } = req.user;
  //Checking user Id
  console.log("User ID is:", user._id);

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    //Make a new Note
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id
    });
    
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while saving the note",
    });
  }
});

// Edit note using ID
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ message: "No changes added" });
  }

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Editing what has been changed
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get all notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete  note using ID
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        message: "Note is not found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({
      _id: noteId,
      userId: user._id,
    });

    if (!note) {
      return res.status(400).json({ message: "Note not found" });
    }

    // Editing what has been changed
    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(8000, () => {
  console.log("Server has started on port 8000");
});

module.exports = app;
