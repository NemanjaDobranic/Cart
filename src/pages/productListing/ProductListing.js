import React, { Component } from "react";
import "./productListing.css";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { getProductsQuery } from "../../resources/queries/queries";
import { compose } from "redux";
import Loader from "../../components/loader/Loader";

class ProductListing extends Component {
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
          <div key={product.id}>
            <img src={product.gallery[0]} alt={product.name} />
          </div>
        ))}
      </div>
    ) : null;
  }

  render() {
    if (!this.props.data || this.props.data.loading) {
      return <Loader className="center-loader" />;
    }

    return (
      <div className="ProductListing">
        <h1>{this.state.categoryName}</h1>
        {this.displayProducts()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryName: state.categoryName,
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(getProductsQuery, {
    // name: "getProductsQuery",
    skip: (props) => !props.categoryName,
    options: (props) => ({
      fetchPolicy: "network-only",
      variables: {
        categoryName: props.categoryName,
      },
    }),
  })
)(ProductListing);
