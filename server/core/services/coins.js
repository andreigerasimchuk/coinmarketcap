import { createCoins, getAllCoins } from '../../dao';
import fetch from 'node-fetch';

const getCoins = () => {
  return fetch('https://api.coinmarketcap.com/v2/listings/', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      let { data } = res;
      data.length = 10;
      return data;
    })
    .catch(err => []);
}

const getCoinsСourses = async (coinId) => {
  const data = await fetch(`https://api.coinmarketcap.com/v2/ticker/${coinId}`, { method: 'GET' });
  const json = await data.json();
  return json;
}

const updateCoinsInformations = () => {
  let coins;
  getAllCoins()
    .then(result => {
      coins = result;
      return getCoins();
    })
    .then(data => {
      coins.map(coin => {
        let index = data.filter(value => coin.id === value.id);
        if (index != -1) { data.splice(index, 1); }
      });
      return data;
    })
    .then(data => {
      if (data.length > 0) {
        createCoins(data);
      }
    });
}

const getCoinsForUpdate = (coins) => {
  const currentDate = new Date().getTime();
  const currentCoins = coins.filter(coin =>
    (Number(coin.lastupdatedate) + coin.updatefrequency) < currentDate);
  return currentCoins;
}

const getCurrentCoinsForUpdate = (coins, userCurrentCoins) => {
  let currentCoins = userCurrentCoins.map(coin => {
    const index = coins.findIndex(c => c.data.id === coin.c_id);
    const currentCoin = coins[index].data;
    return {
      c_id: coin.c_id,
      uc_id: coin.uc_id,
      lasttimeupdate: new Date().getTime(),
      price: currentCoin.quotes.USD.price,
      percent_change_1h: currentCoin.quotes.USD.percent_change_1h
    }
  });
  return currentCoins;
}

export {
  getCurrentCoinsForUpdate,
  updateCoinsInformations,
  getCoinsForUpdate,
  getCoinsСourses,
}