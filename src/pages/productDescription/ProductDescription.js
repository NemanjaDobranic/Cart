import React, { Component } from "react";
import "./productDescription.css";
import Loader from "../../components/loader/Loader";
import { graphql } from "react-apollo";
import { getProductQuery } from "../../resources/queries/queries";

class ProductDescription extends Component {
  state = {
    product: null,
  };

  shouldComponentUpdate(nextProps) {
    const {
      data: { product },
      history,
    } = nextProps;

    if (!product.inStock) {
      history.push("/");
      return false;
    }

    if (this.state.product) {
      return false;
    }

    this.setState({
      ...this.state,
      product,
    });
    return true;
  }

  displayProduct(product) {
    return <div className="ProductDescription">{product.name}</div>;
  }

  render() {
    const { data } = this.props;
    if (!data || data.loading) {
      return <Loader className="center-loader" />;
    }

    const { product } = this.state;
    return product ? this.displayProduct(product) : null;
  }
}

export default graphql(getProductQuery, {
  options: (props) => ({
    fetchPolicy: "no-cache",
    errorPolicy: "all",
    variables: {
      id: props.match.params.id,
    },
  }),
})(ProductDescription);
