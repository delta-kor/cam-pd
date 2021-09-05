import { Router } from 'express';
import UserController from '../controllers/user.controller';
import CreateUserDto from '../dtos/create-user.dto';
import ValidateGuard from '../guards/validate.guard';
import AsyncUtil from '../utils/async.util';

const UserRouter = Router();

UserRouter.post(
  '/',
  ValidateGuard(CreateUserDto),
  AsyncUtil(UserController.createUser.bind(UserController))
);

export default UserRouter;
