import React, { Component } from 'react';
import './index.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state = {
      loginError: false,
      messageError: '',
    }
  }
  onLogin = (event) => {
    event.preventDefault();
    const correctlogin = this.loginInput.current.value;
    const password = this.passwordInput.current.value;
    if (!correctlogin.trim().length || !password.trim().length) {
      this.setState({
        loginError: true,
        messageError: 'The username or password can not be empty.'
      });
      return;
    }
    this.props.authService.login(correctlogin, password)
      .then(() => {
        this.props.handleLogIn();
        this.props.history.replace('/');
      })
      .catch(errMessage => {
        this.setState({
          loginError: true,
          messageError: errMessage
        });
      });
  }
  render() {
    return (
      <div className="page-container">
        <div className="login">
          <form className="" onSubmit={this.onLogin} className="login-form">
            <label className="login-form__label">Username:</label>
            <input
              type="text"
              className="login-form__userName"
              ref={this.loginInput}
            />
            <label className="login-form__label">Password:</label>
            <input
              type="password"
              className="login-form__userPassword"
              ref={this.passwordInput}
            />
            <button className="login-form__btn btn">login</button>
            {this.state.loginError && <div>{this.state.messageError}</div>}
          </form>
        </div>
      </div >
    )
  }
}

export default Login;