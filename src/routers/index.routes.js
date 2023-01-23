import { Router } from "express";
import usersRoutes from './users.routes.js'
import entriesRoutes from './entries.routes.js'

const router = Router();

router.use([usersRoutes, entriesRoutes]);

export default router;