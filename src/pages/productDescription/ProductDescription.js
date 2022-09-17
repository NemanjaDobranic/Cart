import React, { Component } from "react";
import "./productDescription.css";
import Loader from "../../components/loader/Loader";
import { graphql } from "react-apollo";
import { getProductQuery } from "../../resources/queries/queries";

class ProductDescription extends Component {
  state = {
    product: null,
    activeImage: null,
  };

  componentDidUpdate() {
    const {
      data: { product },
    } = this.props;

    if (!this.state.product)
      this.setState({
        product,
        activeImage: { src: product.gallery[0], shake: false },
      });
  }

  shouldComponentUpdate(nextProps) {
    const {
      data: { product },
      history,
    } = nextProps;

    if (!product.inStock) {
      history.push("/");
      return false;
    }

    return true;
  }

  setActiveImage = (image) => {
    this.setState({
      ...this.state,
      activeImage: {
        src: image,
        shake: true,
      },
    });

    setTimeout(
      () =>
        this.setState({
          ...this.state,
          activeImage: { ...this.state.activeImage, shake: false },
        }),
      2000
    );
  };

  displayProduct(product) {
    return (
      <div className="ProductDescription">
        <div className="product-gallery">
          {product.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={image}
              onClick={() => {
                this.setActiveImage(image);
              }}
            />
          ))}
        </div>
        <img
          id="active-image"
          className={this.state.activeImage.shake ? "shake" : null}
          src={this.state.activeImage.src}
          alt=""
        />
        <div>Fin i sladak</div>
      </div>
    );
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
