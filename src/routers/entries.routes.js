import {Router} from 'express';
import {verifyEntry} from '../middlewares/entries.middlewares.js'
import {postEntry, getEntries} from '../controllers/entries.controllers.js'

const router = Router();

router.post('/entries', verifyEntry, postEntry);
router.get('/entries', getEntries);

export default router;