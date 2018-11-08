import React, { Component } from 'react';
import './dashboard.css';
import vouchers from '../../data/voucher.js';
import Voucher from '../voucher/Voucher';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      user: {
        displayName: 'shadrach',
        email: 'shadrachtemitayo@gmail.com'
      },
      vouchers
    }
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="">
        <section className="details user-details">
          <div className="user-detail-card"><span className="user-detail-title">Name :</span> {this.state.user.displayName}</div>
          <div className="user-detail-card"><span className="user-detail-title">Email :</span> {this.state.user.email}</div>
        </section>
        <section className="voucher-list">
          <h1>Featured vouchers</h1>
          <div className="details">
            { 
              this.state.vouchers.map((voucher, i) => {
                return <Voucher key={i} voucher={voucher} click={this.props.getPayment}/>
              })
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;