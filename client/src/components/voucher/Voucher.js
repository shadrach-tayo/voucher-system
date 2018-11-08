import React from 'react';
import './voucher.css';
import voucherImage from '../../images/voucher-image.jpg';

const Voucher = (props) => {
  const { voucher, click } = props;
  return (
       <div className="detail-card" id={voucher.code} aria-label={voucher.name}>
          <img className="voucher-image" src={voucherImage} alt={voucher.name}/>
          <h4 className="voucher-name">{voucher.name}</h4>
          <p className="voucher-price">{voucher.price}</p>
          <button className="voucher-btn" onClick={click}>Buy Now</button>
        </div>
  );
}

export default Voucher;