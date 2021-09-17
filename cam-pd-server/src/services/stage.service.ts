import NotfoundException from '../exceptions/notfound.exception';
import StageModel, { Stage } from '../models/stage.model';

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
    const videoId = await StageModel.findOne({ uuid });
    if (!videoId) throw new NotfoundException();
    return 'https://google.com/';
  }
}

const StageService = new StageServiceClass();

export default StageService;
