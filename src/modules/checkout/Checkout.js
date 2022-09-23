import React, { Component } from "react";
import "./checkout.css";
import { connect } from "react-redux";
import Cart from "../../components/cart/Cart";

class Checkout extends Component {
  shouldComponentUpdate(nextProps) {
    const { quantity, history } = nextProps;
    if (!quantity) {
      history.push("/");
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="Checkout">
        <h1>cart</h1>
        <Cart slidableGallery={true} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: [...state.cart.products],
    quantity: state.cart.quantity,
    currency: state.navbar.currency,
  };
};

export default connect(mapStateToProps)(Checkout);
