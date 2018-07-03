class Auth {

  login(login, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    };

    return fetch('http://localhost:3009/api/login', requestOptions)
      .then(res => this.handleResponse(res))
      .then(user => {
        this.setUser(user);
        return Promise.resolve(user);
      });
  }

  logOut() {
    localStorage.removeItem('user');
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const lsUser = localStorage.getItem('user');
    if( lsUser === null ) {
      return null;
    }
    return JSON.parse(lsUser);
  }

  getToken() {
    const user = this.getUser();
    if (user === null) {
      return null;
    }
    return user.token || null;
  }

  getUserId() {
    const user = this.getUser();
    if (user === null) {
      return null;
    }
    return user.userId || null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token;
  }

  handleResponse(res) {
    return res.json()
      .then(data => {
        if (!res.ok) {
          const error = data.message;
          return Promise.reject(error);
        }
        return data.user;
      });
  }
}

export default Auth;