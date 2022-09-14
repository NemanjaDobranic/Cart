import React, { Component } from "react";
import { graphql } from "react-apollo";
import Currencies from "../currencies/Currencies";
import "./Navbar.css";
import BrandIcon from "../../assets/icons/brand_icon.svg";
import EmptyCart from "../../assets/icons/empty_cart.svg";
import { getCategoriesAndCurrenciesQuery } from "../../queries/queries";

class Navbar extends Component {
  handleCategoryClick = (categoryName) => {
    console.log(categoryName);
  };

  displayCategories = () =>
    !this.props.data.loading
      ? this.props.data.categories.map((category) => (
          <li
            key={category.name}
            onClick={() => {
              this.handleCategoryClick(category.name);
            }}
          >
            {category.name}
          </li>
        ))
      : null;

  render() {
    return (
      <div className="Navbar">
        <ul className="categories">{this.displayCategories()}</ul>
        <img src={BrandIcon} className="logo" alt="a brand logo" />
        <div className="currency-cart">
          <Currencies currencies={this.props.data.currencies} />
          <img src={EmptyCart} alt="a cart icon" />
        </div>
      </div>
    );
  }
}

export default graphql(getCategoriesAndCurrenciesQuery)(Navbar);
