import React, { Component } from "react";
import { graphql } from "react-apollo";
import Currencies from "../currencies/Currencies";
import "./navbar.css";
import BrandIcon from "../../assets/icons/brand_icon.svg";
import EmptyCart from "../../assets/icons/empty_cart.svg";
import { getCategoriesAndCurrenciesQuery } from "../../resources/queries/queries";
import { connect } from "react-redux";
import { setCategory } from "../../resources/actions/navbarActions";
import { Link } from "react-router-dom";
import Minicart from "../../modules/minicart/Minicart";

class Navbar extends Component {
  state = {
    showMinicart: false,
  };

  componentDidUpdate() {
    if (!this.props.categoryName && !this.props.data.loading) {
      this.props.setCategory(this.props.data.categories[0].name);
    }
  }

  displayCategories = () =>
    !this.props.data.loading
      ? this.props.data.categories.map((category) => (
          <Link to="/" key={category.name}>
            <li
              className={
                category.name === this.props.categoryName ? "active" : null
              }
              onClick={() => {
                this.props.setCategory(category.name);
              }}
            >
              {category.name}
            </li>
          </Link>
        ))
      : null;

  handleCartIconClick = () => {
    this.setState({
      showMinicart: !this.state.showMinicart,
    });
  };

  closeCart = () => {
    this.setState({
      showMinicart: false,
    });
  };

  render() {
    return (
      <div>
        <div className="Navbar">
          <ul className="categories">{this.displayCategories()}</ul>
          <img src={BrandIcon} className="logo" alt="a brand logo" />
          <div className="currency-cart">
            {!this.props.data.loading && (
              <Currencies currencies={this.props.data.currencies} />
            )}
            <img
              src={EmptyCart}
              alt="a cart icon"
              onClick={this.handleCartIconClick}
            />
            {this.props.totalQuantity > 0 && (
              <div onClick={this.handleCartIconClick}>
                {this.props.totalQuantity}
              </div>
            )}
          </div>
        </div>
        {this.state.showMinicart && <Minicart closeCart={this.closeCart} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryName: state.navbar.categoryName,
    totalQuantity: state.cart.quantity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCategory: (categoryName) => {
      dispatch(setCategory(categoryName));
    },
  };
};

export default graphql(getCategoriesAndCurrenciesQuery)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
