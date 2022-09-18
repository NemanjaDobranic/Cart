import React, { Component } from "react";
import "./listing.css";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { getProductsQuery } from "../../../resources/queries/queries";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { getPrice } from "../../../resources/commonFunctions/commonFunctions";
import Loader from "../../../components/loader/Loader";
import CircleIcon from "../../../assets/icons/circle_icon.svg";

class Listing extends Component {
  state = {
    categoryName: null,
    products: null,
  };

  componentDidUpdate() {
    const {
      data: { category },
    } = this.props;

    if (category && category.name !== this.state.categoryName) {
      this.setState({
        categoryName: category.name,
        products: category.products,
      });
    }
  }

  displayProducts() {
    const products = this.state.products;
    return products ? (
      <div className="product-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`product-decription/${product.id}`}
            className={!product.inStock ? "out-of-stock" : null}
          >
            <img src={product.gallery[0]} alt={product.name} />
            {product.inStock ? (
              <img src={CircleIcon} alt="circle icon" className="circle-icon" />
            ) : null}
            <ul>
              <li>{product.name}</li>
              <li>{getPrice(product.prices, this.props.currency)}</li>
            </ul>
          </Link>
        ))}
      </div>
    ) : null;
  }

  render() {
    const { data } = this.props;
    if (!data || data.loading) {
      return <Loader className="center-loader" />;
    }

    return (
      <div className="Listing">
        <h1>{this.state.categoryName}</h1>
        {this.displayProducts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryName: state.categoryName,
    currency: state.currency,
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(getProductsQuery, {
    // name: "getProductsQuery",
    skip: (props) => !props.categoryName,
    options: (props) => ({
      fetchPolicy: "cache-and-network",
      variables: {
        categoryName: props.categoryName,
      },
    }),
  })
)(Listing);
