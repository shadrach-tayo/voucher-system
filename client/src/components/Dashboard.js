import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        displayName: 'shadrach',
        email: 'shadrachtemitayo@gmail.com'
      }
    }
  }

  render() {
    return (
      <div className="container">
        <section className="details">
          <div className="detail-card"><span className="detail-title">Name :</span> {this.state.user.displayName}</div>
          <div className="detail-card"><span className="detail-title">Email :</span> {this.state.user.email}</div>
        </section>
        <section className="item-list">
          <h1>List of Purchased Vouchers:</h1>
          <div className="details">
            <div className="detail-card">
              <h4>#100 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
            <div className="detail-card">
              <h4>#500 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
            <div className="detail-card">
              <h4>#1000 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;