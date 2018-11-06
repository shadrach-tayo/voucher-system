import React from 'react';
import { Button } from 'react-materialize';
import './header.css';

const Header = (props) => {
  let currentDisplay = '';
  if(props.isLoggedIn) {
     currentDisplay =
      <header>
        <a className="banner" href="/">Voucher Pay</a>
        <Button className="logout-btn" onClick={this.props.logout()}>Logout</Button>
      </header>
  } else {
    currentDisplay = 
      <header>
        <a className="banner" href="/">Voucher Pay</a>
      </header>
  }
  return (
    <div>
      {currentDisplay}
    </div>
  );
}

export default Header;