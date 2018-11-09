import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isloggedIn: false,
      user: null
    }

    this.getUser = this.getUser.bind(this);
  }

  componentWillMount() {
    this.getUser().then(user => {
      console.log('user is :', user);
      this.setState({user, isloggedIn: true});
    });
    console.log(this.state);
  }

  getUser() {
    return fetch('api/current_user')
      .then(res => res.json())
      .catch(err => console.log('user not loggedIn: ', err))
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header isloggedIn={this.state.isloggedIn} />
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" render={() => <Dashboard/>} />
            {/* <Route path="/dashboard/wallet" exact={() => <Wallet /> }/> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
