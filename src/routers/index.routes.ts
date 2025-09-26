import { Router } from "express";
import usersRoutes from './users.routes.js'
import transactionsRoutes from './transactions.routes.js'

const router = Router();

router.use([usersRoutes, transactionsRoutes]);

export default router;