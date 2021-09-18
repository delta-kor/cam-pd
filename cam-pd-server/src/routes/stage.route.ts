import { Router } from 'express';
import StageController from '../controllers/stage.controller';
import CreateStageDto from '../dtos/create-stage.dto';
import GetVideoDto from '../dtos/get-video.dto';
import AuthGuard from '../guards/auth.guard';
import ValidateGuard from '../guards/validate.guard';
import AsyncUtil from '../utils/async.util';

const StageRouter = Router();

StageRouter.get('/', AsyncUtil(StageController.getStages.bind(StageController)));
StageRouter.post(
  '/',
  ValidateGuard(CreateStageDto),
  AsyncUtil(StageController.createStage.bind(StageController))
);
StageRouter.get(
  '/video',
  AuthGuard,
  ValidateGuard(GetVideoDto, true),
  AsyncUtil(StageController.getVideo.bind(StageController))
);

export default StageRouter;
