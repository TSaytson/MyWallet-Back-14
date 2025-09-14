import express from 'express';
import cors from 'cors'
import router from './routers/index.routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors())
.use(express.json())
.use(router)
.use(errorHandlerMiddleware);

export default app