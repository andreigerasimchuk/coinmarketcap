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
router.get('/user/:userId', getUserCoins);
router.get('/courses/:userId', getUserCoinCourses);

router.patch('/', updateCoinUser);

router.delete('/user/:userId', removeUserCoin);

router.post('/:userId', passport.authenticate('jwt', { session: false }), setUserCoins);

export default router;
