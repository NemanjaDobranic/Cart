import React, { Component } from "react";
import { graphql } from "react-apollo";
import Currencies from "../currencies/Currencies";
import "./Navbar.css";
import BrandIcon from "../../assets/icons/brand_icon.svg";
import EmptyCart from "../../assets/icons/empty_cart.svg";
import { getCategoriesAndCurrenciesQuery } from "../../queries/queries";

class Navbar extends Component {
  handleCategoryClick = (e) => {
    console.log("meow");
  };

  render() {
    console.log(this.props);
    return (
      <div className="Navbar">
        <ul>
          <li onClick={this.handleCategoryClick}>women</li>
          <li>men</li>
          <li>kids</li>
        </ul>
        <img src={BrandIcon} className="logo" alt="a brand logo" />
        <div className="currency-cart">
          <Currencies />
          <img src={EmptyCart} alt="a cart icon" />
        </div>
      </div>
    );
  }
}

export default graphql(getCategoriesAndCurrenciesQuery)(Navbar);
