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

    this.payWithRave = this.payWithRave.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
  }

  componentWillMount() {
    this.getUser().then(user => {
      console.log('user returned: ', user);
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

  payWithRave(e) {
    const voucherId =  e.target.dataset.id;
    var flw_ref = '';
    var PBFKey = 'FLWPUBK-5b4184669ccdc431a9be3ed86098f516-X';
    const email = this.state.user.email;
    const txRef = 'MG-1498408604222';
    const amount = e.target.dataset.amt.slice(1);
    const user = this.state.user;
    let saveTransaction = this.saveTransaction;
    window.getpaidSetup({
      PBFPubKey: PBFKey,
      customer_email: email,
      customer_firstname: "Temi",
      customer_lastname: "Adelewa",
      amount: amount,
      customer_phone: "",
      country: "NG",
      currency: "NGN",
      txref: txRef, // Pass your UNIQUE TRANSACTION REFERENCE HERE.
      //integrity_hash: hashedValue, // pass the sha256 hashed value here.
      onclose: function() {},
      callback: function(response) {
         flw_ref = response.tx.flwRef;// collect flwRef returned and pass to a 					server page to complete status check.
      console.log("This is the response returned after a charge", response);
      if(response.tx.chargeResponseCode =='00' || response.tx.chargeResponseCode == '0') {
        // redirect to a success page
        console.log('transaction complete');
        const voucher = {
          userId: user.googleId, 
          voucherId,
          amount: response.tx.amount,
          id: response.tx.id
        };
        console.log(voucher);
        
        saveTransaction(voucher);
      } else {
        // redirect to a failure page.
        console.log('transaction failed');
      }
      }
    });
  }

  saveTransaction(voucher) {
    fetch('api/voucher', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voucher)
    }).then(res => console.log(res));
  }

  render() {
    return (
      <div className="">
        <section className="details user-details">
          <div className="user-detail-card">
            <span className="user-detail-title">Name :</span> 
            {this.state.user.displayName}
          </div>
          <div className="user-detail-card">
            <span className="user-detail-title">Email :</span> 
            {this.state.user.email}
          </div>
        </section>
        <section className="voucher-list">
          <h1>Featured vouchers</h1>
          <div className="details">
            { 
              this.state.vouchers.map((voucher, i) => {
                return <Voucher key={i} voucher={voucher} click={this.payWithRave}/>
              })
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;