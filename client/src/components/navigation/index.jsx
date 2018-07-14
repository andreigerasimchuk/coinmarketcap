import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({
  loggedIn,
  handleLogout,
}) => {
  return (
    <div className="navigation">
      <div>
        <Link to='/'>HOME</Link>
      </div>
      {!loggedIn &&
        <div className="navigation__login">
          <Link to='/login'>LOGIN</Link>
        </div>}
      {loggedIn &&
        <React.Fragment>
          <div className="navigation__coins">
            <Link to='/coins'>COINS</Link>
          </div>
          <div className="navigation__coins-list">
            <Link to='/coins-list'>COINS list</Link>
          </div>
          <div className="navigation__logout" onClick={handleLogout}>
            <Link to='/login'>LOGOUT</Link>
          </div>
        </React.Fragment>}
    </div>
  );
}

export default Navigation;
