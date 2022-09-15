import React, { Component } from "react";
import "./productListing.css";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { getProductsQuery } from "../../resources/queries/queries";
import { compose } from "redux";

class ProductListing extends Component {
  render() {
    return <div>Hello</div>;
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
