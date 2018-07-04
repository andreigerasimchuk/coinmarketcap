import express from 'express';
import passport from 'passport';

import { getAllCoins, getCoinsList, setUserCoins } from '../controllers/coins';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllCoins);
router.get('/:userId', passport.authenticate('jwt', { session: false }), getCoinsList);

router.post('/:userId', passport.authenticate('jwt', { session: false }), setUserCoins);

export default router;
