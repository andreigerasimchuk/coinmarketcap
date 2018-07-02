import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigation from '../components/navigation';
import Login from '../components/login';
import Stub from '../components/stub';
import Coins from '../components/coins';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Navigation />
        <Route exact path="/" component={Stub} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/coins" component={Coins} />
      </div>
    );
  }
}

export default App;