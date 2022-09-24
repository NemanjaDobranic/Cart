import React, { Component } from "react";
import "./checkout.css";
import { connect } from "react-redux";
import Cart from "../../components/cart/Cart";
import { getPrice } from "../../resources/commonFunctions/commonFunctions";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  state = {};

  getTax = (bill, tax, currency) =>
    currency.symbol + Math.round(tax * bill * 100) / 100;

  render() {
    const { tax, totalPrices, currency, quantity } = this.props;

    if (!quantity) return <Redirect exact to="/" />;

    const bill = parseFloat(
      getPrice(totalPrices, currency).substring(currency.symbol.length)
    );

    return (
      <div className="Checkout">
        <h1>cart</h1>
        <Cart slidableGallery={true} />
        <dl>
          <dt>Tax {tax * 100}%:</dt>
          <dd>{this.getTax(bill, tax, currency)}</dd>
          <dt>Quantity:</dt>
          <dd>{quantity}</dd>
          <dt>Total:</dt>
          <dd>{getPrice(totalPrices, currency)}</dd>
        </dl>
        <button>order</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: [...state.cart.products],
    quantity: state.cart.quantity,
    tax: state.cart.tax,
    totalPrices: state.cart.totalPrices,
    currency: state.navbar.currency,
  };
};

export default connect(mapStateToProps)(Checkout);
