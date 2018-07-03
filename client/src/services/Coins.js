import Auth from './Auth';

const AuthService = new Auth();

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

}

export default Coins;
