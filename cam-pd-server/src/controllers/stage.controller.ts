import CreateStageDto from '../dtos/create-stage.dto';
import StageService from '../services/stage.service';

namespace StageResponse {
  export interface Create extends ApiResponse {
    uuid: string;
    title: string;
    concert: string;
    video_id: string;
  }
}

class StageControllerClass {
  private readonly stageService = StageService;

  public async createStage(
    req: TypedRequest<CreateStageDto>,
    res: TypedResponse<StageResponse.Create>
  ): Promise<void> {
    const stage = await this.stageService.create(
      req.body.title,
      req.body.concert,
      req.body.video_id
    );
    res.json({
      ok: true,
      uuid: stage.uuid,
      title: stage.title,
      concert: stage.concert,
      video_id: stage.videoId,
    });
  }
}

const StageController = new StageControllerClass();

export default StageController;
