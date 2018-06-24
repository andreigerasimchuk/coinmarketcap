import express from 'express';
import passport from 'passport';

import { getAllCoins } from '../controllers/coins';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllCoins);

export default router;