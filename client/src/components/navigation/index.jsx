import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div>
          <Link to='/'>HOME</Link>
        </div>
        <div className="navigation__login">
          <Link to='/login'>LOGIN</Link>
        </div>
        <div className="navigation__coins">
          <Link to='/coins'>COINS</Link>
        </div>
      </div>
    );
  }
}

export default Navigation;