import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './common/routes';
import unknownEndpoint from './middlewares/unknownEndpoint';
import cookieParser from 'cookie-parser';

// to use env variables
import './common/env';

require('dotenv').config();

const app: Application = express();

// middleware
app.disable('x-powered-by');
app.use(cors({
 origin: process.env.CORS_ORIGIN,
 methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
}));
app.use(helmet());
app.use(compression());
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  }),
);
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    'health-check': 'OK: top level api working',
  });
});

app.use('/api/', routes);

// Handle unknown endpoints
app.use('*', unknownEndpoint);

export default app;
