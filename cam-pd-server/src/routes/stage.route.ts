import { Router } from 'express';
import StageController from '../controllers/stage.controller';
import CreateStageDto from '../dtos/create-stage.dto';
import ValidateGuard from '../guards/validate.guard';
import AsyncUtil from '../utils/async.util';

const StageRouter = Router();

StageRouter.post(
  '/',
  ValidateGuard(CreateStageDto),
  AsyncUtil(StageController.createStage.bind(StageController))
);

export default StageRouter;
