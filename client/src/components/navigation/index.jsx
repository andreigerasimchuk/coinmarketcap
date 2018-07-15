import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Navigation = ({
  loggedIn,
  handleLogout,
}) => {
  return (
    <div className="navigation">
      {!loggedIn &&
        <div className="navigation__login">
          <Link to='/login'>LOGIN</Link>
        </div>}
      {loggedIn &&
        <React.Fragment>
          <div className="navigation__logout" onClick={handleLogout}>
            <Link to='/login'>LOGOUT</Link>
          </div>
          <div className="navigation__coins">
            <Link to='/'>courses</Link>
          </div>
          <div className="navigation__coins-list">
            <Link to='/coins-list'>settings</Link>
          </div>
        </React.Fragment>}
    </div>
  );
}

export default Navigation;
