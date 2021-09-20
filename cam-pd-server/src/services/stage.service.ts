import NotfoundException from '../exceptions/notfound.exception';
import EnvModel, { Env } from '../models/env.model';
import StageModel, { Stage } from '../models/stage.model';
import getCurrentData from '../utils/timing.util';
import VimeoUtil from '../utils/vimeo.util';

class StageServiceClass {
  public async get(): Promise<Stage[]> {
    return StageModel.find();
  }

  public async create(
    title: string,
    concert: string,
    videoId: string,
    length: number
  ): Promise<Stage> {
    const stage: Stage = new StageModel({ title, concert, videoId, length });
    await stage.save();

    return stage;
  }

  public async getVideo(uuid: string): Promise<string> {
    const stage: Stage | null = await StageModel.findOne({ uuid });
    if (!stage) throw new NotfoundException();

    return VimeoUtil.getVideoUrl(stage.videoId);
  }

  public async updateVimeoToken(token: string): Promise<string> {
    const jwt: Env | null = await EnvModel.findOne({ key: 'vimeo_jwt' });
    if (!jwt) throw new Error('Vimeo jwt not found');

    jwt.value = token;
    await jwt.save();

    return jwt.value;
  }

  public async checkData(uuid: string, data: InputData): Promise<number> {
    const stage: Stage | null = await StageModel.findOne({ uuid });
    if (!stage) throw new NotfoundException();

    if (!data[0]) data[0] = 4;

    const scoresheet: ScoreSheet = {};

    const rawScoresheetItems = stage.scoresheet.split('-');
    for (const item of rawScoresheetItems) {
      const time = parseInt(item.split('.')[0]);
      scoresheet[time] = item
        .split('.')[1]
        .split('')
        .map(item => parseInt(item));
    }

    const stageLength = stage.length;

    let score: number = 0;

    for (let i = 0; i < stageLength / 10; i++) {
      const current = i * 10;
      const scoresheetData = getCurrentData(scoresheet, current) as number[];
      const inputData = getCurrentData(data, current) as number;
      const currentScore = scoresheetData[inputData];
      score += currentScore;
    }

    return score;
  }
}

const StageService = new StageServiceClass();

export default StageService;
