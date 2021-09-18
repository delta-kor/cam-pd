import NotfoundException from '../exceptions/notfound.exception';
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
}

const StageService = new StageServiceClass();

export default StageService;
