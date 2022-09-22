import React from "react";
import "./cart.css";
import { connect } from "react-redux";
import { getPrice } from "../../resources/commonFunctions/commonFunctions";
import { addProduct, removeProduct } from "../../resources/actions/cartActions";

const Cart = ({ products, currency, addProduct, removeProduct }) => {
  const displayProducts = () => {
    return products.map((product, index) => (
      <div className="product" key={index}>
        <div className="info">
          <h1>{product.name}</h1>
          <h1>{getPrice(product.prices, currency)}</h1>
          {product.attributes.map((attribute) => (
            <div key={attribute.id} className="attribute">
              <span>{attribute.name}:</span>
              <div>
                {attribute.items.map((item, index) =>
                  attribute.type !== "swatch" ? (
                    <div
                      key={index}
                      className={
                        JSON.stringify(item) ===
                        JSON.stringify(attribute.selectedItem)
                          ? "text selected"
                          : "text"
                      }
                    >
                      {item.displayValue}
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="color"
                      style={{ backgroundColor: item.displayValue }}
                    >
                      {JSON.stringify(item) ===
                        JSON.stringify(attribute.selectedItem) && <div></div>}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="quantity-control">
          <span onClick={() => addProduct(product)}>+</span>
          <span>{product.quantity}</span>
          <span onClick={() => removeProduct(product)}>-</span>
        </div>

        <img src={product.gallery[0]} alt={product.gallery[0]} />
      </div>
    ));
  };
  return <div className="Cart">{displayProducts()}</div>;
};

const mapStateToProps = (state) => {
  return {
    products: [...state.cart.products],
    currency: state.navbar.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(addProduct(product));
    },
    removeProduct: (product) => {
      dispatch(removeProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
