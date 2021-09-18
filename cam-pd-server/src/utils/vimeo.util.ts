import EnvModel from '../models/env.model';

class VimeoUtilClass {
  private jwt: string | null = null;

  private async loadJwt(): Promise<void> {
    const jwt = await EnvModel.findOne({ key: 'vimeo_jwt' });
    if (!jwt) throw new Error('Vimeo jwt not found');

    this.jwt = jwt.value;
  }

  public async getVideoUrl(videoId: string): Promise<string> {
    await this.loadJwt();
    return 'https://google.com/';
  }
}

const VimeoUtil = new VimeoUtilClass();

export default VimeoUtil;
