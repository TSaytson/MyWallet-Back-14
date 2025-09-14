import {Router} from 'express';
import {signUp, signIn} from '../controllers/users.controllers';
import { validateBody } from '../middlewares/validation.middleware';
import { signInSchema, signUpSchema } from '../schemas/users.schema';

const router = Router();

router.post('/signUp', validateBody(signUpSchema), signUp);
router.post('/signIn', validateBody(signInSchema), signIn);

export default router;