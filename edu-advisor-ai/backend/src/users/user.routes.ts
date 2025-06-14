import {Router} from 'express';
import {registerUser} from './user.controller';

const router = Router();

router.post('/signup', registerUser);

export default router;