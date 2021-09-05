import crypto from 'crypto';
import { Application, NextFunction } from 'express';
import UnauthorizedException from '../exceptions/unauthorized.exception';

class IpPipe {
  public static use(application: Application): void {
    application.use((req: TypedRequest, res: TypedResponse, next: NextFunction) => {
      const ticket = req.headers.ticket as string;
      if (!ticket) throw new UnauthorizedException();

      const sectors = ticket.split('.');
      if (sectors.length !== 3) throw new UnauthorizedException();

      const encodedIp = sectors[0];
      const ip = Buffer.from(encodedIp, 'base64').toString('utf-8');

      const securityCode = sectors[1];
      const hash = sectors[2];

      const data = `${encodedIp}.${securityCode}${process.env.SECRET}`;

      const hasher = crypto.createHash('sha256');
      hasher.update(data, 'utf-8');
      const dataHash = hasher.digest('base64');

      if (hash !== dataHash) throw new UnauthorizedException();

      req.clientIp = ip;

      next();
    });
  }
}

export default IpPipe;
