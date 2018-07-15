import React, { Component } from 'react';
import AuthWrapped from '../AuthWrapped';
import CoinsList from './coins-list';
import UserCoinsList from './user-coins-list';
import './index.scss';

class DataList extends Component {
  state = {
    userCoins: [],
    coins: [],
  };
  componentDidMount() {
    this.props.coinsService.getUserCoins()
      .then(coins => {
        let currentCoins = this.props.coinsService.createCoins(coins);
        this.setState({ userCoins: currentCoins });
        return this.props.coinsService.getListCoins();
      })
      .then(data => {
        let currentCoins = this.props.coinsService.createCoins(data);
        this.setState({ coins: currentCoins });
      });
  }
  handleRemoving = (uc_id) => {
    this.props.coinsService.removeUserCoin(uc_id)
      .then(data => {
        if (data.message = 'ok') {
          const { userCoins } = this.state;
          const coinIndex = userCoins.findIndex(coin => coin.uc_id === uc_id);
          userCoins.splice(coinIndex, 1);
          let currentCoins = this.props.coinsService.createCoins(data.coins);
          this.setState({ userCoins, coins: [...this.state.coins, ...currentCoins] });
        }
      });
  }
  handleUpdateFrequency = (id, value) => {
    const { userCoins } = this.state;
    const index = userCoins.findIndex(coin => coin.c_id === id);
    userCoins[index].updatefrequency = value;
    this.setState({ userCoins });
  }
  handleCoinUpdatingFrequency = (id, value) => {
    const { coins } = this.state;
    const index = coins.findIndex(coin => coin.c_id === id);
    coins[index].updatefrequency = value;
    this.setState({ coins: coins });
  }
  handleUpdating = (uc_id, updatefrequency) => {
    this.props.coinsService.updateUserCoin(uc_id, updatefrequency * 60 * 1000);
  }
  handleChecking = (id) => {
    const { coins } = this.state;
    const index = coins.findIndex(coin => coin.c_id === id);
    coins[index].checked = !coins[index].checked;
    this.setState({ coins: coins });
  }
  onSubmitForm = (event) => {
    event.preventDefault();
    let coins = this.state.coins.filter(coin => coin.checked);
    let currentCoins = coins.map(coin => {
      return {
        c_id: coin.c_id,
        updatefrequency: coin.updatefrequency * 60 * 1000,
      }
    });
    this.props.coinsService.setUserCoins({ coins: currentCoins })
      .then(data => {
        let currentCoinsList = this.props.coinsService.createCoins(data.coins);
        let currentAddedCoins = this.props.coinsService.createCoins(data.addedCoins);
        this.setState({
          coins: currentCoinsList,
          userCoins: [...this.state.userCoins, ...currentAddedCoins],
        });
      });
  }
  render() {
    return (
      <div className="page-container">
        <div className="coins-list__wrapper">
          <CoinsList
            list={this.state.coins}
            handleChecking={this.handleChecking}
            onSubmitForm={this.onSubmitForm}
            handleCoinUpdatingFrequency={this.handleCoinUpdatingFrequency}
          />
          <UserCoinsList
            list={this.state.userCoins}
            handleRemoving={this.handleRemoving}
            handleUpdateFrequency={this.handleUpdateFrequency}
            handleUpdating={this.handleUpdating}
          />
        </div>
      </div>
    );
  }
}

export default AuthWrapped(DataList);