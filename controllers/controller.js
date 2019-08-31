const User = require("../models/mongoose").User;
const Task = require("../models/mongoose").Task;

const landingPage = async (req, res) => {
  res.render("landing.ejs");
};

const usersPost = async (req, res) => {
  let data = req.body;
  let createdUser = await User.create(data);
};

const tasksPost = async (req, res) => {
  let data = req.body;
  let createdTask = await Task.create(data);
};

const getUsers = async (req, res) => {
  let foundUsers = await User.find({});
  res.send(foundUsers);
};

const getUser = async (req, res) => {
  let { id } = req.params;
  let foundUser = await User.findById(id);
  res.send(foundUser);
};

const getTasks = async (req, res) => {
  let foundTasks = await Task.find({});
  res.send(foundTasks);
};

const getTask = async (req, res) => {
  let { id } = req.params;
  let foundTask = await Task.findById(id);
  res.send(foundTask);
};

const updateTask = async (req, res) => {
  let bodyProperties = req.body;
  let { id } = req.params;
  let check = true;
  for (let property in bodyProperties) {
    if (property !== "description" && property !== "completed") {
      check = false;
      break;
    }
  }
  if (check) {
    try {
      let updatedTask = await Task.findByIdAndUpdate(id, req.body);
      return res.send(updatedTask);
    } catch (e) {
      console.log(e);
    }
  }

  res.send({
    error: "No task found or wrong inputs"
  });
};

const updateUser = async (req, res) => {
  let bodyProperties = req.body;
  let { id } = req.params;
  let check = true;
  for (let property in bodyProperties) {
    if (
      property !== "name" &&
      property !== "email" &&
      property !== "age" &&
      property !== "password"
    ) {
      check = false;
      break;
    }
  }
  if (check) {
    try {
      let updatedUser = await User.findByIdAndUpdate(id, req.body);
      res.send(updatedUser);
      return;
    } catch (e) {
      console.log(e);
    }
  }

  res.send({
    error: "No user found or wrong inputs"
  });
};

module.exports = {
  landingPage: landingPage,
  usersPost: usersPost,
  tasksPost: tasksPost,
  getUsers: getUsers,
  getTasks: getTasks,
  getUser: getUser,
  getTask: getTask,
  updateTask: updateTask,
  updateUser: updateUser
};
