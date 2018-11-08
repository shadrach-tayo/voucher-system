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
  }

  componentDidMount() {
    this.getUser().then(user => {
      this.setState((state, props) => ({
        isloggedIn: true,
        user
      }));
    });
    console.log(this.state);
  }

  getUser() {
    return fetch('api/current_user')
      .then(res => res.json())
      .catch(err => console.log('user not loggedIn: ', err))
  }

  getPayment(e) {
    console.log('getting payment for: ', e.target.parentNode.getAttribute('id'));
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header isloggedIn={this.state.isloggedIn} />
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" render={() => <Dashboard getPayment={this.getPayment}/>} />
            {/* <Route path="/dashboard/wallet" exact={() => <Wallet /> }/> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
