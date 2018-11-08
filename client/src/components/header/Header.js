import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {
  constructor(props) {
    super();
    this.isLoggedIn = props.isLoggedIn;
    console.log(props);
  }

  render() {
    let currentDisplay = this.props.isLoggedIn 
     ? <Button className="logout-btn" onClick={this.logout()}>Logout</Button>
     : '';
    return (
      <div>
        <header>
        <Link 
          to={this.props.isLoggedIn ? '/dashboard' : '/'}
          className="banner" 
        >
          Voucher Pay
        </Link>
        <div className="right">
          {currentDisplay}
        </div>
      </header>
      </div>
    );
  }
  
}

export default Header;