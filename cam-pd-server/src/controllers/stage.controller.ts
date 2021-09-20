import CheckDataDto from '../dtos/check-data.dto';
import CreateStageDto from '../dtos/create-stage.dto';
import GetVideoDto from '../dtos/get-video.dto';
import UpdateVimeoTokenDto from '../dtos/update-vimeo-token.dto';
import StageService from '../services/stage.service';
import ScoreData = StageResponse.CheckData;

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

  export interface UpdateVimeoToken extends ApiResponse {
    updated_token: string;
  }

  export interface CheckData extends ApiResponse {
    score: number;
    personal_best: number;
    world_best: number;
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
      req.body.video_id,
      req.body.length
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

  public async updateVimeoToken(
    req: TypedRequest<UpdateVimeoTokenDto>,
    res: TypedResponse<StageResponse.UpdateVimeoToken>
  ): Promise<void> {
    const token = req.body.token;
    const updatedToken = await this.stageService.updateVimeoToken(token);
    res.json({ ok: true, updated_token: updatedToken });
  }

  public async checkData(
    req: TypedRequest<CheckDataDto>,
    res: TypedResponse<ScoreData>
  ): Promise<void> {
    const uuid = req.body.uuid;
    const data = req.body.data;
    const score = await this.stageService.checkData(uuid, data);
    res.json({ ok: true, score, personal_best: 0, world_best: 0 });
  }
}

const StageController = new StageControllerClass();

export default StageController;
