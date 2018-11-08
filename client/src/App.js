import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedIn: false,
      user: '',
      boughtVouchers: []
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    fetch('api/current_user')
      .then(res => res.json())
      .then(user => {
        this.setState({...this.state, isloggedIn: true, user});
        console.log(this.state);
      })
      .catch(err => console.log('user not loggedIn: ', err))
  }

  getPayment(e) {
    console.log('getting payment for: ', e.target.parentNode.getAttribute('id'));
  }

  logout() {
    console.log('logging user out');
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header isloggedIn={this.state.isloggedIn} logout={this.logout}/>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" render={() => <Dashboard getPayment={this.getPayment}/>}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }

}



export default App;
