import React, { Component } from 'react';
import './dashboard.css';
import Voucher from '../voucher/Voucher';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      vouchers: []
    }
  }

  componentWillMount() {
    this.getUser().then(user => {
      this.setState({...this.state, user});
    });

    this.getAllVouchers().then(response => {
      const vouchers = response;
      this.setState((state) => ({
        ...state,
        ...vouchers
      }))
      console.log(this.state);
    })
  }

  getUser() {
    return fetch('api/current_user')
      .then(res => res.json())
      .catch(err => console.log('user not loggedIn: ', err))
  }

  getAllVouchers() {
    return fetch('api/vouchers').then(res => res.json())
    .catch(err => console.log(err))
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