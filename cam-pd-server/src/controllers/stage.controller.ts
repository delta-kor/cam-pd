import StageService from '../services/stage.service';

class StageControllerClass {
  private readonly stageService = StageService;

  public async createStage(req: TypedRequest, res: TypedResponse): Promise<void> {}
}

const StageController = new StageControllerClass();

export default StageController;
