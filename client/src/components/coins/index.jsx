import React, { Component } from 'react';
import AuthWrapped from '../AuthWrapped';

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: null,
    };
  }

  render() {
    return (
      <div className="container">
        Coins
      </div>
    );
  }
}

export default AuthWrapped(Coins);