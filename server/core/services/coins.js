import { getAllCoins, createCoins } from '../../dao/coins';
import fetch from 'node-fetch';

const updateCoinsInformations = () => {
  let coins;
  getAllCoins()
    .then(result => {
      console.log(result);
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

const getCoins = () => {
  return fetch('https://api.coinmarketcap.com/v2/listings/', { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      let { data } = res;
      data.length = 3;
      return data;
    })
    .catch(err => []);
}

export {
  updateCoinsInformations,
}