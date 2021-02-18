const express = require('express');

const userController = require('./../controller/userController');

const usersRouter = express.Router();

usersRouter.route('/').get(userController.getAllUsers).post(userController.AddNewUser);
usersRouter.route('/:id').get(userController.getUser).patch(userController.UpdateUser).delete(userController.deleteUser);

module.exports = usersRouter;