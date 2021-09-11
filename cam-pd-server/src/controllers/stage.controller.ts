import CreateStageDto from '../dtos/create-stage.dto';
import StageService from '../services/stage.service';

interface StageItem {
  uuid: string;
  title: string;
  concert: string;
  video_id: string;
}

namespace StageResponse {
  export interface Get extends ApiResponse {
    stages: StageItem[];
  }

  export interface Create extends StageItem, ApiResponse {}
}

class StageControllerClass {
  private readonly stageService = StageService;

  public async getStages(req: TypedRequest, res: TypedResponse<StageResponse.Get>): Promise<void> {
    const stages = await this.stageService.get();
    const result = stages.map<StageItem>(stage => ({
      uuid: stage.uuid,
      title: stage.title,
      concert: stage.concert,
      video_id: stage.videoId,
    }));
    res.json({ ok: true, stages: result });
  }

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
