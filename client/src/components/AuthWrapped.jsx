import React, { Component } from 'react';
import AuthService from '../services/Auth';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = { user: null }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      } else {
        const user = Auth.getUser();
        this.setState({ user });
      }
    }

    render() {
      if (this.state.user) {
        return (<AuthComponent history={this.props.history} user={this.state.user} />)
      } else {
        return null
      }
    }
  };
}