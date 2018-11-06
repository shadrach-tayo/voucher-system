import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header isloggedIn="true"/>
          <Route exact={true} path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
