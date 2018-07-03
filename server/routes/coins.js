import express from 'express';
import passport from 'passport';

import { getAllCoins, getCoinsList } from '../controllers/coins';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllCoins);
router.get('/:userId', passport.authenticate('jwt', { session: false }), getCoinsList);

export default router;
