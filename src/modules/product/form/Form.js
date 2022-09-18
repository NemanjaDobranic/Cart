import React, { Component } from "react";
import "./form.css";
import { connect } from "react-redux";
import { getPrice } from "../../../resources/commonFunctions/commonFunctions";

class Form extends Component {
  addToCart = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  handleChange = (attribute, item) => {
    console.log(attribute);
    console.log(item);
  };

  render() {
    const { product, currency } = this.props;
    return (
      <form className="Form" onSubmit={this.addToCart}>
        <h1>{product.brand}</h1>
        <h1>{product.name}</h1>
        <ul className="attributes">
          {product.attributes.map((attribute) => (
            <li key={attribute.name}>
              <h3>{attribute.name}:</h3>
              <div className="attribute">
                {attribute.items.map((item) => (
                  <span key={item.id} className="item">
                    <input
                      type="checkbox"
                      onClick={() => this.handleChange(attribute, item)}
                    />
                    {attribute.type !== "swatch" ? (
                      <label
                        className="text"
                        onClick={() => this.handleChange(attribute, item)}
                      >
                        {item.displayValue}
                      </label>
                    ) : (
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: item.value,
                        }}
                        onClick={() => this.handleChange(attribute, item)}
                      >
                        <div></div>
                      </div>
                    )}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <h3>price:</h3>
        <span id="price">{getPrice(product.prices, currency)}</span>
        <button type="submit">add to cart</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(Form);
