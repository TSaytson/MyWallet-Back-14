import {Router} from 'express';
import {postTransaction, getTransactions, deleteTransaction} from '@/controllers/transactions.controller.js'
import { validateBody } from '@/middlewares/validation.middleware.js';
import { transactionSchema } from '@/schemas/transactions.schema.js';
import { authMiddleware } from '@/middlewares/auth.middleware.js';

const router = Router();

router.use('/', authMiddleware);
router.post('/transactions', validateBody(transactionSchema), postTransaction);
router.get('/transactions', getTransactions);
router.delete('/transactions/:id', deleteTransaction);


export default router;