import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const port = parseInt(process.env.PORT!) || 3000;
const app = new App(port);

app.load().then(() => {
  app.start();
});
