import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let data = new FormData();
    data.append('username', 'asdf');
    data.append('email', email.value);
    data.append('password', password.value);
    console.log(data);
    console.log(username.value);
    // this.signInUser()
  }

  googleSignIn() {
    window.location = 'auth/google';
  }

  render() {
    return (
      <div className="login-card">
        <h1>Login Or Signup</h1>
        <form id="signUpForm">
          <Input type="text" id="username" placeholder="Username" s={6} validate required/>
          <Input type="email" id="email" placeholder="example@gmail.com" s={6} required/>
          <Input type="password" id="password" label="password" s={6} required/>
          <Button waves='light' onClick={this.handleSubmit}>Sign up</Button>
        </form>
        <p>OR</p>
        <Button onClick={this.googleSignIn}>Sign in with Google</Button>
      </div>       
    );
  }
}

export default Login;