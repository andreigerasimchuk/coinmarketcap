import express from 'express';
import { PORT } from './config';
import bodyParser from 'body-parser';
import cors from'cors';

const app = express();

const init = () => {
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cors());
}
  
const start = () => {
  const port = process.env.PORT || PORT;
  app.listen(port, err => {
    if (err) {
        console.error(err, 'Internal server error');
      } else {
        console.info(`Server is up on ${port}'s port`);
      }
  });
}

export {
    init,
    start,
}