import {
  getUsersCoinsForUpdate,
  setUserCoinsCourses,
  getUserCoinsCourses,
} from '../../dao';

import {
  getCoinsСourses,
  getCoinsForUpdate,
  getCurrentTimeUpdate,
  getCurrentCoinsForUpdate
} from '../../core/services/coins';

export default async (req, res) => {
  const { userId } = req.params;
  let userCurrentCoins;
  getUsersCoinsForUpdate(userId)
    .then(data => {
      userCurrentCoins = getCoinsForUpdate(data);
      console.log(userCurrentCoins)
      return userCurrentCoins;
    })
    .then(data => {
      let coinsCourses = data.map((coin) => getCoinsСourses(coin.c_id));
      return Promise.all(coinsCourses);
    })
    .then(coins => {
      let currentCoins = getCurrentCoinsForUpdate(coins, userCurrentCoins);
      return currentCoins.length ? setUserCoinsCourses(currentCoins) : currentCoins;
    })
    .then(data => {
      return getUserCoinsCourses(userId);
    })
    .then(data => {
      const currentCoins = getCurrentTimeUpdate(data);
      res.status(200).json(currentCoins);
    })
    .catch(err => res.status(500).json(err));
}
