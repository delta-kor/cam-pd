declare namespace Express {
  interface Request {
    jwt: JwtPayload | null;
    user?: import('../models/user.model').User;
    clientIp: string;
  }
}

type TypedRequest<P = any, Q = any> = import('express').Request<any, any, P, Q>;
type TypedResponse<P extends ApiResponse = ApiResponse> = import('express').Response<P>;
type Route = (
  req: TypedRequest,
  res: TypedResponse,
  next: import('express').NextFunction
) => Promise<any>;
