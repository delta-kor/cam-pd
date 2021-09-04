import express, { Application } from 'express';
import mongoose from 'mongoose';

class App {
  private readonly port: number;
  private readonly application: Application;

  constructor(port: number) {
    this.port = port;
    this.application = express();
  }

  public async load(): Promise<void> {
    await this.connectDatabase();
  }

  public async connectDatabase(): Promise<void> {
    await mongoose.connect(process.env.DB_PATH!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  public start(): void {
    this.application.listen(this.port, () =>
      console.log(`Server started in port ${this.port}`)
    );
  }
}

export default App;
