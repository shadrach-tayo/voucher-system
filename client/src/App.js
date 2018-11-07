import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isloggedIn: false,
      user: ''
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
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }

}



export default App;
