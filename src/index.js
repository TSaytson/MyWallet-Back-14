import express from 'express';
import cors from 'cors'
import routes from './routers/index.routes.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors())
.use(express.json())
.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`))