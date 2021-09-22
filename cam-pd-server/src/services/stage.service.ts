import NotfoundException from '../exceptions/notfound.exception';
import EnvModel, { Env } from '../models/env.model';
import RecordModel, { Record } from '../models/record.model';
import StageModel, { Stage } from '../models/stage.model';
import { User } from '../models/user.model';
import getCurrentData from '../utils/timing.util';
import VimeoUtil from '../utils/vimeo.util';

interface CheckResult {
  score: number;
  personalBest: number;
  worldBest: number;
}

interface UserRecordResult {
  personalBest: number;
  worldBest: number;
}

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

  public async checkData(uuid: string, data: InputData, user: User): Promise<CheckResult> {
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

    for (let i = 0; i < stageLength / 5; i++) {
      const current = i * 5;
      const scoresheetData = getCurrentData(scoresheet, current) as number[];
      const inputData = getCurrentData(data, current) as number;
      const currentScore = scoresheetData[inputData];
      score += currentScore;
    }

    const record = new RecordModel({ userUuid: user.uuid, score, data });
    await record.save();

    const records = await StageServiceClass.getUserRecord(uuid, user);

    return { score, personalBest: records.personalBest, worldBest: records.worldBest };
  }

  private static async getUserRecord(uuid: string, user: User): Promise<UserRecordResult> {
    const userUuid = user.uuid;
    const bestPersonalRecord: Record[] = await RecordModel.find({ uuid, userUuid })
      .sort({ score: -1 })
      .limit(1);
    const bestWorldRecord: Record[] = await RecordModel.find({ uuid }).sort({ score: -1 }).limit(1);

    const personalBest = bestPersonalRecord[0].score;
    const worldBest = bestWorldRecord[0].score;
    return { personalBest, worldBest };
  }
}

const StageService = new StageServiceClass();

export default StageService;
