import { Router } from "express";
import usersRoutes from './users.routes'
// import transactionsRoutes from './transactions.routes.ts'

const router = Router();

router.use([usersRoutes]);

export default router;