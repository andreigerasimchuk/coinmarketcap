import {
  getUsersCoinsForUpdate,
  setUserCoinsCourses,
  getUserCoinsCourses,
} from '../../dao';

import {
  getCoinsСourses,
  getCoinsForUpdate,
  getCurrentCoinsForUpdate
} from '../../core/services/coins';

export default async (req, res) => {
  const { userId } = req.params;
  let userCurrentCoins;
  getUsersCoinsForUpdate(userId)
    .then(data => {
      userCurrentCoins = getCoinsForUpdate(data);
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
      console.log(data);
      const currentDate = new Date().getTime();
      let currentCoins = data.map(coin => {
        return {
          ...coin,
          lastupdatedate: currentDate - coin.lastupdatedate, 
        }
      })
      res.status(200).json(currentCoins);
    })
    .catch(err => res.status(500).json(err));
}
