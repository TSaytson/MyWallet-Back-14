import {Router} from 'express';
import {verifyTransaction} from '../middlewares/transactions.middlewares.js'
import {postTransaction, getTransactions} from '../controllers/transactions.controllers.js'

const router = Router();

router.post('/transactions', verifyTransaction, postTransaction);
router.get('/transactions', getTransactions);

export default router;