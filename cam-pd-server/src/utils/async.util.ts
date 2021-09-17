import { NextFunction } from 'express';

function AsyncUtil(route: Route) {
  return function (req: TypedRequest, res: TypedResponse, next: NextFunction): void {
    route(req, res, next).catch(next);
  };
}

export default AsyncUtil;
