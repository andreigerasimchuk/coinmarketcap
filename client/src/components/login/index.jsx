import React, { Component } from 'react';
import AuthService from '../../services/Auth';
import './index.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginInput = React.createRef();
    this.passwordInput = React.createRef();
    this.Auth = new AuthService();
  }
  onLogin = (event) => {
    event.preventDefault();
    const correctlogin = this.loginInput.current.value;
    const password = this.passwordInput.current.value;
    this.Auth.login(correctlogin, password)
      .then(data => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div className="page-container">
        <div className="login">
          <form className="" onSubmit={this.onLogin}>
            <input
              type="text"
              className="login__userName"
              ref={this.loginInput}
            />
            <input
              type="password"
              className="login__userPassword"
              ref={this.passwordInput}
            />
            <button className="">login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;