import AuthService from './Auth';

const authService = new AuthService();
const defaultUpdateFrequency = 30;

class Coins {

  getListCoins() {
    const userId = authService.getUserId();
    return fetch(`http://localhost:3009/api/coins/${userId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
        }
      })
      .then(res => res.json())
      .then(coins => {
        return coins;
      });
  }

  getUserCoins() {
    const userId = authService.getUserId();
    return fetch(`http://localhost:3009/api/coins/user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
        }
      })
      .then(res => res.json())
      .then(coins => {
        return coins;
      });
  }

  setUserCoins(coins) {
    const userId = authService.getUserId();
    return fetch(`http://localhost:3009/api/coins/${userId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
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
        uc_id: coin.uc_id,
        c_id: coin.c_id,
        coinname: coin.coinname,
        checked: false,
        updatefrequency: coin.updatefrequency || defaultUpdateFrequency,
      }
    });
    return currentCoins;
  }

  getCoinsCourses() {
    const userId = authService.getUserId();
    return fetch(`http://localhost:3009/api/coins/courses/${userId}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
        }
      })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  removeUserCoin(userCoinId) {
    return fetch(`http://localhost:3009/api/coins/user/${userCoinId}`,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
        }
      })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
  updateUserCoin(userCoinId, updatefrequency) {
    const dataUpdate = { 
      uc_id: userCoinId,
      updatefrequency,
    };
    return fetch('http://localhost:3009/api/coins/',
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + authService.getToken(),
        },
        body: JSON.stringify(dataUpdate),
      })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
}

export default Coins;
