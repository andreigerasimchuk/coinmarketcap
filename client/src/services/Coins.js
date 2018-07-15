import AuthService from './Auth';

const authService = new AuthService();
const defaultUpdateFrequency = 30;

class Coins {

  getListCoins() {
    const userId = authService.getUserId();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      }
    };
    return fetch(`http://localhost:3009/api/coins/${userId}`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        return Promise.resolve(data.coins);
      });
  }

  getUserCoins() {
    const userId = authService.getUserId();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      }
    };
    return fetch(`http://localhost:3009/api/coins/userCoins/${userId}`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        return Promise.resolve(data.coins);
      });
  }

  setUserCoins(coins) {
    const userId = authService.getUserId();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      },
      body: JSON.stringify(coins),
    };
    return fetch(`http://localhost:3009/api/coins/${userId}`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        return Promise.resolve(data);
      });
  }

  createCoins(coins) {
    let currentCoins = coins.map(coin => {
      return {
        uc_id: coin.uc_id,
        c_id: coin.c_id,
        coinname: coin.coinname,
        checked: false,
        updatefrequency: coin.updatefrequency / (60 * 1000) || defaultUpdateFrequency,
      }
    });
    return currentCoins;
  }

  getCoinsCourses() {
    const userId = authService.getUserId();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      },
    };
    return fetch(`http://localhost:3009/api/coins/courses/${userId}`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        let currentCourses = data.coins.map(coin => {
          const currentUpdateDate = coin.lastupdatedate / (60 * 1000);
          return {
            ...coin,
            lastupdatedate: Math.round(currentUpdateDate),
          }
        })
        return Promise.resolve(currentCourses);
      });
  }

  removeUserCoin(userCoinId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      },
    };
    return fetch(`http://localhost:3009/api/coins/${userCoinId}`, requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        return Promise.resolve(data.coins);
      });
  }

  updateUserCoin(userCoinId, updatefrequency) {
    const dataUpdate = {
      uc_id: userCoinId,
      updatefrequency,
    };
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + authService.getToken(),
      },
      body: JSON.stringify(dataUpdate),
    };
    return fetch('http://localhost:3009/api/coins/', requestOptions)
      .then(res => this.handleResponse(res))
      .then(data => {
        return Promise.resolve(data);
      });
  }

  handleResponse(res) {
    return res.json()
      .then(data => {
        if (!res.ok) {
          const error = data.message;
          return Promise.reject(error);
        }
        return data;
      });
  }
}

export default Coins;
