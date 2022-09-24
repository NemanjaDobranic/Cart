import React from "react";
import "./minicart.css";
import { connect } from "react-redux";
import { getPrice } from "../../resources/commonFunctions/commonFunctions";
import Cart from "../../components/cart/Cart";
import { withRouter } from "react-router-dom";

const MiniCart = ({
  closeCart,
  totalQuantity,
  totalPrices,
  currency,
  history,
}) => {
  const handleCheckOut = () => {
    history.push("/checkout");
    closeCart();
  };

  return (
    <div className="MiniCart">
      <div className="wrapper" onClick={closeCart}></div>
      <div className="cart">
        <h1>
          <span>My Bag,&nbsp;</span>
          <span>{totalQuantity}&nbsp;items</span>
        </h1>
        {totalQuantity > 0 && (
          <div>
            <Cart slidableGallery={false} />
            <div className="total-price">
              <span>Total</span>
              <span>{getPrice(totalPrices, currency)}</span>
            </div>
            <div className="footer">
              <button>view bag</button>
              <button onClick={handleCheckOut}> check out</button>
            </div>
          </div>
        )}
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

export default withRouter(connect(mapStateToProps)(MiniCart));
