import express from 'express';
import passport from 'passport';

import { createUser, getUsers, login } from '../controllers/users';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUsers);

router.post('/', createUser);
router.post('/login', login);

export default router;