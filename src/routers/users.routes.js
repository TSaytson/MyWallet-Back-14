import {Router} from 'express';
import {validateSignUp, validateSignIn} from '../middlewares/users.middlewares.js';
import {signUp, signIn} from '../controllers/users.controllers.js';

const router = Router();

router.post('/signUp', validateSignUp, signUp);
router.post('/signIn', validateSignIn, signIn);

export default router;