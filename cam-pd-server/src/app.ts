import express, { Application } from 'express';

class App {
  private readonly port: number;
  private readonly application: Application;

  constructor(port: number) {
    this.port = port;
    this.application = express();
  }

  start(): void {
    this.application.listen(this.port, () =>
      console.log(`Server started in port ${this.port}`)
    );
  }
}

export default App;
