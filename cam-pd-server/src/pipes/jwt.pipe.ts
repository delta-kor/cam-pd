import { Application, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class JwtPipe {
  public static use(application: Application): void {
    application.use((req: TypedRequest, res: TypedResponse, next: NextFunction) => {
      const authorization = req.headers.authorization as string;

      if (!authorization) return next();

      const type = authorization.split(' ')[0];
      const value = authorization.split(' ').slice(1).join(' ');

      if (type !== 'Bearer') return next();

      try {
        req.jwt = jwt.verify(value, process.env.SECRET!) as JwtPayload;
        return next();
      } catch {
        return next();
      }
    });
    application.use((req: TypedRequest, res: TypedResponse, next: NextFunction) => {
      if (req.jwt) return next();

      const token = req.query.token;
      if (!token) return next();

      try {
        req.jwt = jwt.verify(token, process.env.SECRET!) as JwtPayload;
        return next();
      } catch {
        return next();
      }
    });
  }
}

export default JwtPipe;
