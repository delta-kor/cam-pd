import axios from 'axios';
import EnvModel from '../models/env.model';

interface VimeoVideoDataItem {
  quality: string;
  type: string;
  link: string;
  size: number;
}

interface CacheItem {
  videoId: string;
  cdnUrl: string;
  cacheUntil: number;
}

class VimeoUtilClass {
  private jwt: string | null = null;
  private readonly cache: Map<string, CacheItem> = new Map();

  private getCache(videoId: string): CacheItem | null {
    const currentTime = Date.now();
    for (const item of this.cache.values()) {
      if (item.cacheUntil < currentTime) {
        this.cache.delete(item.videoId);
      }
    }

    return this.cache.get(videoId) || null;
  }

  private setCache(videoId: string, cdnUrl: string): void {
    const currentTime = Date.now();
    const cacheUntil = currentTime + 1000 * 60 * 5;
    const cacheItem: CacheItem = {
      videoId,
      cdnUrl,
      cacheUntil,
    };
    this.cache.set(videoId, cacheItem);
  }

  private async loadJwt(): Promise<void> {
    const jwt = await EnvModel.findOne({ key: 'vimeo_jwt' });
    if (!jwt) throw new Error('Vimeo jwt not found');

    this.jwt = jwt.value;
  }

  private async fetchVideoData(videoId: string): Promise<string> {
    if (!this.jwt) throw new Error('Jwt is not loaded');

    const url = `https://api.vimeo.com/videos/${videoId}?fields=files.size,files.link,files.type,files.quality`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `jwt ${this.jwt}`,
      },
    });

    const data = response.data;
    if (data.error) throw new Error('Jwt expired');

    const files: VimeoVideoDataItem[] = data.files;
    if (!files) throw new Error('Vimeo video data not found');

    let max: number = 0;
    for (const file of files) {
      if (file.type !== 'video/mp4') continue;
      max = Math.max(file.size, max);
    }

    for (const file of files) {
      if (file.size === max) return file.link;
    }

    return files[0].link;
  }

  public async getVideoUrl(videoId: string): Promise<string> {
    const cachedUrl = this.getCache(videoId);
    if (cachedUrl) return cachedUrl.cdnUrl;

    await this.loadJwt();

    const videoUrl = await this.fetchVideoData(videoId);
    const cdnUrl = await VimeoUtilClass.getCdnUrl(videoUrl);
    const trimmedUrl = VimeoUtilClass.trimUrl(cdnUrl);

    this.setCache(videoId, trimmedUrl);
    return trimmedUrl;
  }

  private static async getCdnUrl(url: string): Promise<string> {
    const response = await axios.get(url, { maxRedirects: 0, validateStatus: () => true });
    return response.headers.location;
  }

  private static trimUrl(url: string): string {
    return url.split('?filename')[0];
  }
}

const VimeoUtil = new VimeoUtilClass();

export default VimeoUtil;
