import React, { Component } from 'react';
import AuthWrapped from '../AuthWrapped';
import CoinsService from '../../services/Coins';
import Coin from './coin';
import './index.scss';

class CoinsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
    this.CoinsService = new CoinsService();
  }

  componentDidMount() {
    this.CoinsService.getListCoins()
      .then(coins => {
        let currentCoins = this.CoinsService.createCoins(coins);
        this.setState({ coins: currentCoins });
      });
  }

  handleChecked = (id) => {
    const { coins } = this.state;
    const index = coins.findIndex(coin => coin.c_id === id);
    coins[index].checked = !coins[index].checked;
    this.setState({ coins: coins });
  }

  handleUpdateFrequency = (id, value) => {
    const { coins } = this.state;
    const index = coins.findIndex(coin => coin.c_id === id);
    coins[index].updatefrequency = value;
    this.setState({ coins: coins });
  }
  onSubmitForm = (event) => {
    event.preventDefault();

    let coins = this.state.coins.filter(coin => coin.checked);
    let currentCoins = coins.map(coin => {
      return {
        c_id: coin.c_id,
        updatefrequency: coin.updatefrequency,
      }
    });
    this.CoinsService.setUserCoins({ coins: currentCoins })
      .then(data => {
        let currentCoins = this.CoinsService.createCoins(data);
        this.setState({ coins: currentCoins });
      });
  }
  render() {

    const coinsList = this.state.coins.map(coin => {
      return <Coin
        name={coin.coinname}
        key={coin.c_id}
        handleChecked={this.handleChecked}
        id={coin.c_id}
        checked={coin.checked}
        updateFrequency={coin.updatefrequency}
        handleUpdateFrequency={this.handleUpdateFrequency}
      />
    });

    return (
      <div className="page-container">
        <div className="coins">
          <form className="coins-form" onSubmit={this.onSubmitForm}>
            <button
              type="submit"
              className="coins-form__btn"
            >
              SAVE
            </button>
            <div className="coins-form__list">{coinsList}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthWrapped(CoinsList);