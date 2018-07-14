import React, { Component } from 'react';
import AuthService from '../services/Auth';

export default function withAuth(AuthComponent) {
  const authService = new AuthService();
  return class AuthWrapped extends Component {
    state = {
      user: null,
    };
    componentWillMount() {
      if (!authService.loggedIn()) {
        this.props.history.replace('/login')
      } else {
        const user = authService.getUser();
        this.setState({ user });
      }
    }

    render() {
      if (this.state.user) {
        return (<AuthComponent history={this.props.history} user={this.state.user} {...this.props} />);
      } else {
        return null;
      }
    }
  };
}