import {Router} from 'express';
import {signUp, signIn} from '../controllers/users.controller.js';
import { validateBody } from '../middlewares/validation.middleware.js';
import { signInSchema, signUpSchema } from '../schemas/users.schema.js';

const router = Router();

router.post('/signUp', validateBody(signUpSchema), signUp);
router.post('/signIn', validateBody(signInSchema), signIn);

export default router;