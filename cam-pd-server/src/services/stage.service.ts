import NotfoundException from '../exceptions/notfound.exception';
import EnvModel from '../models/env.model';
import StageModel, { Stage } from '../models/stage.model';
import VimeoUtil from '../utils/vimeo.util';

class StageServiceClass {
  public async get(): Promise<Stage[]> {
    return StageModel.find();
  }

  public async create(title: string, concert: string, videoId: string): Promise<Stage> {
    const stage = new StageModel({ title, concert, videoId });
    await stage.save();

    return stage;
  }

  public async getVideo(uuid: string): Promise<string> {
    const stage = await StageModel.findOne({ uuid });
    if (!stage) throw new NotfoundException();

    return VimeoUtil.getVideoUrl(stage.videoId);
  }

  public async updateVimeoToken(token: string): Promise<string> {
    const jwt = await EnvModel.findOne({ key: 'vimeo_jwt' });
    if (!jwt) throw new Error('Vimeo jwt not found');

    jwt.value = token;
    await jwt.save();

    return jwt.value;
  }

  public async checkData(uuid: string, data: InputData): Promise<number> {
    const stage = await StageModel.findOne({ uuid });
    if (!stage) throw new NotfoundException();

    const scoresheet: ScoreSheet = {};

    const rawScoresheetItems = stage.scoresheet.split('-');
    for (const item of rawScoresheetItems) {
      const time = parseInt(item.split('.')[0]);
      scoresheet[time] = item
        .split('.')[1]
        .split('')
        .map(item => parseInt(item));
    }

    const keys = Object.keys(scoresheet).map(item => parseInt(item));

    return 1;
  }
}

const StageService = new StageServiceClass();

export default StageService;
