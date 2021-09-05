import { Router } from 'express';
import UserController from '../controllers/user.controller';
import CreateUserDto from '../dtos/create-user.dto';
import AuthGuard from '../guards/auth.guard';
import ValidateGuard from '../guards/validate.guard';
import AsyncUtil from '../utils/async.util';

const UserRouter = Router();

UserRouter.get('/', AuthGuard, AsyncUtil(UserController.getUser.bind(UserController)));
UserRouter.post(
  '/',
  ValidateGuard(CreateUserDto),
  AsyncUtil(UserController.createUser.bind(UserController))
);

export default UserRouter;
