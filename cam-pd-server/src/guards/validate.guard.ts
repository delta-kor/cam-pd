import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction } from 'express';
import UnprocessableEntityException from '../exceptions/unprocessable-entity.exception';

function ValidateGuard(type: any, query: boolean = false, skipMissingProperties = false): Route {
  return async function (req: TypedRequest, res: TypedResponse, next: NextFunction): Promise<any> {
    validate(plainToClass(type, query ? req.query : req.body), {
      skipMissingProperties,
    }).then(err => {
      if (err.length > 0) {
        const values = Object.values(err[0].constraints!);
        next(new UnprocessableEntityException(values[values.length - 1]));
      } else {
        next();
      }
    });
  };
}

export default ValidateGuard;
