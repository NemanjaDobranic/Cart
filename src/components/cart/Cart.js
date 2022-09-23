import React, { Component } from "react";
import "./cart.css";
import { connect } from "react-redux";
import { getPrice } from "../../resources/commonFunctions/commonFunctions";
import { addProduct, removeProduct } from "../../resources/actions/cartActions";
import Arrow from "../../assets/icons/vector.svg";

const Cart = ({
  products,
  currency,
  addProduct,
  removeProduct,
  slidableGallery,
}) => {
  const displayProducts = () => {
    return products.map((product, index) => (
      <div className="product" key={index}>
        <div className="info">
          <h1>{product.brand}</h1>
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

        <ProductGallery
          gallery={product.gallery}
          slidableGallery={slidableGallery}
        />
      </div>
    ));
  };
  return <div className="Cart">{displayProducts()}</div>;
};

class ProductGallery extends Component {
  state = {
    position: 0,
  };

  handleLeft = (position, length) =>
    this.setState({ position: position > 0 ? --position : length - 1 });

  handleRight = (position, length) =>
    this.setState({ position: position < length - 1 ? ++position : 0 });

  render() {
    const { gallery, slidableGallery } = this.props;
    return (
      <div className="gallery">
        <img
          src={gallery[this.state.position]}
          alt={gallery[this.state.position]}
        />
        {slidableGallery && gallery.length > 1 && (
          <div
            className="left"
            onClick={() => {
              this.handleLeft(this.state.position, gallery.length);
            }}
          >
            <img src={Arrow} alt="left" />
          </div>
        )}
        {slidableGallery && gallery.length > 1 && (
          <div
            className="right"
            onClick={() => {
              this.handleRight(this.state.position, gallery.length);
            }}
          >
            <img src={Arrow} alt="right" />
          </div>
        )}
      </div>
    );
  }
}

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
