import express from 'express';
import cors from 'cors'
import router from './routers/index.routes.js';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors())
.use(express.json())
.use(router)
.use(errorHandlerMiddleware);

export default app