const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.landingPage);
router.get("/users", Controller.getUsers);
router.get("/users/:id", Controller.getUser);
router.get("/tasks", Controller.getTasks);
router.get("/tasks/:id", Controller.getTask);
router.post("/users", Controller.usersPost);
router.post("/tasks", Controller.tasksPost);
router.patch("/users/:id", Controller.updateUser);
router.patch("/tasks/:id", Controller.updateTask);

module.exports = router;
