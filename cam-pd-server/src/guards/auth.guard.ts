import { NextFunction } from 'express';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import UserService from '../services/user.service';

async function AuthGuard(req: TypedRequest, res: TypedResponse, next: NextFunction): Promise<void> {
  if (!req.jwt) return next(new UnauthorizedException());

  const user = await UserService.get(req.jwt.uuid);
  if (!user) throw new UnauthorizedException();

  req.user = user;

  next();
}

export default AuthGuard;