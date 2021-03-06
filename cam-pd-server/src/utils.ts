import crypto from 'crypto';

class Utils {
  public static generateUuid(length: number): string {
    return crypto.randomBytes(length / 2).toString('hex');
  }
}

export default Utils;
