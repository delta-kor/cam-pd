import CreateStageDto from '../dtos/create-stage.dto';
import GetVideoDto from '../dtos/get-video.dto';
import StageService from '../services/stage.service';

interface StageItem {
  uuid: string;
  title: string;
  concert: string;
}

namespace StageResponse {
  export interface Get extends ApiResponse {
    stages: StageItem[];
  }

  export interface Create extends StageItem, ApiResponse {
    video_id: string;
  }
}

class StageControllerClass {
  private readonly stageService = StageService;

  public async getStages(req: TypedRequest, res: TypedResponse<StageResponse.Get>): Promise<void> {
    const stages = await this.stageService.get();
    const result = stages.map<StageItem>(stage => ({
      uuid: stage.uuid,
      title: stage.title,
      concert: stage.concert,
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

  public async getVideo(req: TypedRequest<any, GetVideoDto>, res: TypedResponse): Promise<void> {
    const uuid = req.query.uuid;
    const url = await this.stageService.getVideo(uuid);
    res.redirect(url);
  }
}

const StageController = new StageControllerClass();

export default StageController;
