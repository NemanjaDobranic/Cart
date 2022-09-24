import React, { Component } from "react";
import "./description.css";
import Loader from "../../../components/loader/Loader";
import { graphql } from "react-apollo";
import { getProductQuery } from "../../../resources/queries/queries";
import Form from "../form/Form";

class Description extends Component {
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
        activeImage: { src: product.gallery[0], fadeIn: false, fadeOut: false },
      });
  }

  shouldComponentUpdate(nextProps) {
    const {
      data: { product },
      history,
    } = nextProps;

    if (!product || !product.inStock) {
      history.push("/");
      return false;
    }

    return true;
  }

  setActiveImage = (image) => {
    const { src } = this.state.activeImage;
    const timeTrigger = 250;
    if (src === image) return;

    this.setState({
      ...this.state,
      activeImage: { ...this.state.activeImage, fadeOut: true, fadeIn: false },
    });

    setTimeout(
      () =>
        this.setState({
          ...this.state,
          activeImage: {
            src: image,
            fadeIn: true,
            fadeOut: false,
          },
        }),
      timeTrigger
    );

    setTimeout(
      () =>
        this.setState({
          ...this.state,
          activeImage: {
            ...this.state.activeImage,
            fadeIn: false,
            fadeOut: false,
          },
        }),
      2 * timeTrigger
    );
  };

  displayProductDescription(product) {
    return (
      <div className="Description">
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
          className={
            this.state.activeImage.fadeIn
              ? "fadeIn"
              : null + this.state.activeImage.fadeOut
              ? "fadeOut"
              : null
          }
          src={this.state.activeImage.src}
          alt=""
        />
        <Form product={product} />
      </div>
    );
  }

  render() {
    const { data } = this.props;
    if (!data || data.loading) {
      return <Loader className="center-loader" />;
    }

    const { product } = this.state;
    return product ? this.displayProductDescription(product) : null;
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
})(Description);
