import React, { Component } from "react";
import "./form.css";
import { connect } from "react-redux";
import { getPrice } from "../../../resources/commonFunctions/commonFunctions";
import { addProduct } from "../../../resources/actions/cartActions";

class Form extends Component {
  state = {
    attributes: [],
    touched: false,
  };

  componentDidMount() {
    const {
      product: { attributes },
    } = this.props;

    const state = attributes.map((attribute) => {
      return {
        id: attribute.id,
        itemId: null,
        valid: false,
      };
    });

    this.setState({ attributes: state, touched: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { attributes } = this.state;
    this.setState({ ...this.state, touched: true });
    const isFormValid = attributes.every((attr) => attr.valid);

    if (isFormValid) {
      const { product } = this.props;

      const cartAttrs = attributes.map((a1) => {
        const attribute = product.attributes.find((a2) => a1.id === a2.id);
        const selectedItem = attribute.items.find((i1) => i1.id === a1.itemId);
        return { ...attribute, selectedItem };
      });

      const cartProduct = { ...product, attributes: cartAttrs };
      this.props.addProduct(cartProduct);
    }
  };

  handleClick = (attribute, item) => {
    const attributes = this.state.attributes;

    const newAttributes = attributes.map((attr) => {
      if (attr.id === attribute.id) {
        attr.itemId = item.id;
        attr.valid = true;
      }

      return attr;
    });

    this.setState({
      ...this.state,
      attributes: newAttributes,
    });
  };

  isChoosenItem = (attributeId, itemId) =>
    this.state.attributes.find(
      (attr) => attr.id === attributeId && attr.itemId === itemId
    );

  isValidField = (attributeId) => {
    const attribute = this.state.attributes.find(
      (attr) => attr.id === attributeId
    );

    return attribute.valid;
  };

  render() {
    const { product, currency } = this.props;
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
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
                      onClick={() => this.handleClick(attribute, item)}
                    />
                    {attribute.type !== "swatch" ? (
                      <label
                        className={
                          this.isChoosenItem(attribute.id, item.id)
                            ? "text active"
                            : "text"
                        }
                        onClick={() => this.handleClick(attribute, item)}
                      >
                        {item.displayValue}
                      </label>
                    ) : (
                      <div
                        className="swatch"
                        style={{
                          backgroundColor: item.value,
                        }}
                        onClick={() => this.handleClick(attribute, item)}
                      >
                        <div
                          className={
                            this.isChoosenItem(attribute.id, item.id)
                              ? "active"
                              : null
                          }
                        ></div>
                      </div>
                    )}
                  </span>
                ))}
              </div>
              {this.state.touched && !this.isValidField(attribute.id) && (
                <div className="invalid-field">
                  {attribute.name} is required!
                </div>
              )}
            </li>
          ))}
        </ul>
        <h3>price:</h3>
        <span id="price">{getPrice(product.prices, currency)}</span>
        <button type="submit">add to cart</button>
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.navbar.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => {
      dispatch(addProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
