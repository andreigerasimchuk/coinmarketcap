import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/navigation';
import Login from '../components/login';
import Coins from '../components/coins';
import CoinsList from '../components/coins-list';
import AuthService from '../services/Auth';
import CoinsService from '../services/Coins';

class App extends Component {
  state = {
    loggedIn: false,
  };
  componentWillMount() {
    this.authService = new AuthService();
    this.coinsService = new CoinsService();
  }
  handleLogIn = () => {
    this.setState({ loggedIn: true });
  }
  handleLogout = () => {
    this.authService.logOut();
    this.setState({ loggedIn: false });
  }
  componentDidMount() {
    const loggedIn = this.authService.loggedIn();
    this.setState({ loggedIn });
  }
  render() {
    return (
      <div className="app-wrapper">
        <Navigation
          loggedIn={this.state.loggedIn}
          handleLogout={this.handleLogout}
        />
        <Route exact path="/login"
          render={(props) =>
            <Login
              handleLogIn={this.handleLogIn}
              authService={this.authService}
              {...props}
            />}
        />
        <Route exact path="/"
          render={(props) => <Coins coinsService={this.coinsService} {...props} />}
        />
        <Route exact path="/coins-list"
          render={(props) => <CoinsList coinsService={this.coinsService} {...props} />}
        />
      </div>
    );
  }
}

export default App;