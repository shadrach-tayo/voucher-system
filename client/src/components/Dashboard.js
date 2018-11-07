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
      <div className="">
        <section className="details user-details">
          <div className="user-detail-card"><span className="user-detail-title">Name :</span> {this.state.user.displayName}</div>
          <div className="user-detail-card"><span className="user-detail-title">Email :</span> {this.state.user.email}</div>
        </section>
        <section className="item-list">
          <h1>Featured vouchers</h1>
          <div className="details">
            <div className="detail-card">
              <h4 className="voucher-name">#100 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
            <div className="detail-card">
              <h4 className="voucher-name">#500 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
            <div className="detail-card">
              <h4 className="voucher-name">#1000 voucher</h4>
              <p className="purchased">Purchased</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;