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
    this.props.authService.login(correctlogin, password)
      .then(data => {
        this.props.handleLogIn();
        this.props.history.replace('/');
      })
      .catch(err => {
        this.setState({
          loginError: true,
          messageError: err
        });
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
            {this.state.loginError && <div>{this.state.messageError}</div>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login;