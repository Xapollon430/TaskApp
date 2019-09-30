const User = require("../models/mongoose").User;
const Task = require("../models/mongoose").Task;
const Bcrypt = require("bcryptjs"); // hashing password library

const landingPage = async (req, res) => {
	res.render("landing.ejs");
};

const usersPost = async (req, res) => {
	let data = req.body;
	let createdUser = new User(data);
	try {
		createdUser.save();
		res.send(createdUser);
	} catch (e) {
		res.status(400).send(e);
	}
};

const usersLogin = async (req, res) => {
	let user = await User.findByCredential(req.body);
	res.send(user);
};

const tasksPost = async (req, res) => {
	let data = req.body;
	let createdTask = new Task(data);
	await createdTask.save();
	res.send(createdTask);
};

const getUsers = async (req, res) => {
	let foundUsers = await User.find({});

	res.render("users.ejs", { users: foundUsers });
};

const getUser = async (req, res) => {
	let { id } = req.params;
	let foundUser = await User.findById(id);
	res.send(foundUser);
};

const getTasks = async (req, res) => {
	let foundTasks = await Task.find({});
	res.render("tasks.ejs", { tasks: foundTasks });
};

const getTask = async (req, res) => {
	let { id } = req.params;
	let foundTask = await Task.findById(id);
	res.send(foundTask);
};

const updateTask = async (req, res) => {
	let bodyProperties = req.body;
	let { id } = req.params;
	let isValid = updateChecker(bodyProperties, ["description", "completed"]);
	if (isValid) {
		try {
			let task = await Task.findById(id);
			for (let newValue in bodyProperties) {
				task[newValue] = bodyProperties[newValue];
			}
			await task.save();
			return res.send(task);
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
	let isValid = updateChecker(bodyProperties, ["name", "email", "password", "age"]);
	if (isValid) {
		try {
			let user = await User.findById(id);
			for (let newValue in bodyProperties) {
				user[newValue] = bodyProperties[newValue];
			}
			await user.save();
			return res.send(user);
		} catch (e) {
			console.log(e);
		}
	}

	res.send({
		error: "No user found or wrong inputs"
	});
};

const deleteUser = async (req, res) => {
	let { id } = req.params;
	let deletedUser;
	try {
		deletedUser = await User.findByIdAndDelete(id);
	} catch (e) {
		res.send({ error: "User doesnt exist" });
	}
	if (deletedUser) {
		res.send(deletedUser);
	}
};
const deleteTask = async (req, res) => {
	let { id } = req.params;
	let deletedTask;
	try {
		deletedTask = await Task.findByIdAndDelete(id);
	} catch (e) {
		res.send({ error: "Task doesnt exist" });
	}
	if (deletedTask) {
		res.send(deletedTask);
	}
};

const updateChecker = (object, updates) => {
	let check = true;

	for (let update in object) {
		if (!updates.includes(update)) {
			check = false;
		}
	}

	return check;
};

module.exports = {
	landingPage: landingPage,
	usersPost: usersPost,
	usersLogin: usersLogin,
	tasksPost: tasksPost,
	getUsers: getUsers,
	getTasks: getTasks,
	getUser: getUser,
	getTask: getTask,
	updateTask: updateTask,
	updateUser: updateUser,
	deleteUser: deleteUser,
	deleteTask: deleteTask
};
