import StageModel, { Stage } from '../models/stage.model';

class StageServiceClass {
  public async create(title: string, concert: string, videoId: string): Promise<Stage> {
    const stage = new StageModel({ title, concert, videoId });
    await stage.save();

    return stage;
  }
}

const StageService = new StageServiceClass();

export default StageService;
