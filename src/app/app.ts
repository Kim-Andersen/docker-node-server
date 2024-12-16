import express from 'express';
import morgan from 'morgan';
import env from '../config/env';
import logger from '../logger/logger';

const app = express();

app.use(
  morgan(':method :url :status :response-time ms', {
    stream: { write: (message) => logger.info(message.replace('\n', '')) },
  }),
);

app.get('/', (_req, res) => {
  res.status(200).send({
    message: `The server is up and running in ${env.ENV} mode`,
  });
});

export default app;
