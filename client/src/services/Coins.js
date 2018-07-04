import Auth from './Auth';

const AuthService = new Auth();
const defaultUpdateFrequency = 30;

class Coins {

  getListCoins() {
    const userId = AuthService.getUserId();
    return fetch(`http://localhost:3009/api/coins/${userId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + AuthService.getToken(),
        }
      })
      .then(res => res.json())
      .then(coins => {
        return coins;
      });
  }

  setUserCoins(coins) {
    const userId = AuthService.getUserId();
    return fetch(`http://localhost:3009/api/coins/${userId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + AuthService.getToken(),
        },
        body: JSON.stringify(coins),
      })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  createCoins(coins) {
    let currentCoins = coins.map(coin => {
      return {
        c_id: coin.c_id,
        coinname: coin.coinname,
        checked: false,
        updatefrequency: defaultUpdateFrequency,
      }
    });
    return currentCoins;
  }

}

export default Coins;
