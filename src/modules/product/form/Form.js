import React, { Component } from "react";
import "./form.css";
import { connect } from "react-redux";
import { getPrice } from "../../../resources/commonFunctions/commonFunctions";

class Form extends Component {
  render() {
    const { product, currency } = this.props;
    return (
      <div className="Form">
        <h1>{product.brand}</h1>
        <h1>{product.name}</h1>
        <ul className="attributes">
          {product.attributes.map((attribute) => (
            <li key={attribute.name}>
              <h3>{attribute.name}:</h3>
              <div className="attribute">
                {attribute.type !== "swatch"
                  ? attribute.items.map((item) => (
                      <span key={item.id} className="text">
                        {item.displayValue}
                      </span>
                    ))
                  : attribute.items.map((item) => (
                      <span className="swatch" key={item.id}>
                        <div
                          style={{
                            backgroundColor: item.value,
                            color: "transparent",
                          }}
                        ></div>
                      </span>
                    ))}
              </div>
            </li>
          ))}
        </ul>
        <h3>price:</h3>
        <span>{getPrice(product.prices, currency)}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(Form);
