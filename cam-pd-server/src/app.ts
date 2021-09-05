import cors from 'cors';
import express, { Application, json, NextFunction } from 'express';
import mongoose from 'mongoose';
import HttpException from './exceptions/http.exception';
import NotfoundException from './exceptions/notfound.exception';
import IpPipe from './pipes/ip.pipe';
import JwtPipe from './pipes/jwt.pipe';
import UserRouter from './routes/user.route';

class App {
  private readonly port: number;
  private readonly application: Application;

  constructor(port: number) {
    this.port = port;
    this.application = express();
  }

  public async load(): Promise<void> {
    await this.connectDatabase();
    this.mountPipes();
    this.mountRouters();
    this.mountExceptions();
  }

  public async connectDatabase(): Promise<void> {
    await mongoose.connect(process.env.DB_PATH!);
  }

  public mountPipes(): void {
    this.application.use(json());
    this.application.use(cors());
    IpPipe.use(this.application);
    JwtPipe.use(this.application);
  }

  public mountRouters(): void {
    this.application.use('/user', UserRouter);
  }

  public mountExceptions(): void {
    this.application.use(() => {
      throw new NotfoundException();
    });

    this.application.use(
      (err: Error, req: TypedRequest, res: TypedResponse<ExceptionResponse>, _: NextFunction) => {
        if (err instanceof HttpException) {
          res.status(err.status);
          res.json({ ok: false, message: err.message });
          return true;
        }

        console.error(err.name, err.message, err.stack);
        res.json({
          ok: false,
          message: '서버 내부 오류입니다.\n나중에 다시 시도해주세요.',
        });
        return true;
      }
    );
  }

  public start(): void {
    this.application.listen(this.port, () => console.log(`Server started in port ${this.port}`));
  }
}

export default App;
