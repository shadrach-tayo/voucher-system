import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';

const Dashboard = () => <div>Dashboard</div>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact={true} path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
