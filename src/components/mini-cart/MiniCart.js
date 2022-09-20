import React from "react";
import "./mini-cart.css";
import { connect } from "react-redux";
import { getPrice } from "../../resources/commonFunctions/commonFunctions";

const MiniCart = ({ closeCart, totalQuantity, totalPrices, currency }) => {
  return (
    <div className="MiniCart">
      <div className="wrapper" onClick={closeCart}></div>
      <div className="cart">
        <h1>
          <span>My Bag,&nbsp;</span>
          <span>{totalQuantity}&nbsp;items</span>
        </h1>

        <div className="total-price">
          <span>Total</span>
          <span>{getPrice(totalPrices, currency)}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currency: state.navbar.currency,
    totalQuantity: state.cart.quantity,
    totalPrices: state.cart.totalPrices,
  };
};

export default connect(mapStateToProps)(MiniCart);
