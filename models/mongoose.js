const mongoose = require("mongoose");
const Validator = require("validator");

mongoose.connect(
  "mongodb+srv://Vehbi:Anakonda11@cluster0-zaujt.mongodb.net/task?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },

  completed: {
    type: Boolean,
    default: false
  }
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "anonymous",
    trim: true
  },
  age: {
    type: Number,
    validate(age) {
      if (age < 0) {
        throw new Error("Age must be positive");
      }
    }
  },
  email: {
    type: String,
    required: true,
    validate(email) {
      if (!Validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
      }
    },
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(password) {
      if (password.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    }
  }
});

const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Task: Task,
  User: User
};
