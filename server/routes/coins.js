import express from 'express';
import passport from 'passport';

import {
  getAllCoins,
  getCoinsList,
  setUserCoins,
  getUserCoins,
  getUserCoinCourses,
  removeUserCoin,
  updateCoinUser
} from '../controllers';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllCoins);
router.get('/:userId', passport.authenticate('jwt', { session: false }), getCoinsList);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), getUserCoins);
router.get('/courses/:userId', passport.authenticate('jwt', { session: false }), getUserCoinCourses);

router.patch('/', passport.authenticate('jwt', { session: false }), updateCoinUser);

router.delete('/user/:userId', passport.authenticate('jwt', { session: false }), removeUserCoin);

router.post('/:userId', passport.authenticate('jwt', { session: false }), setUserCoins);

export default router;
