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
        activeImage: { src: product.gallery[0], fadeIn: false, fadeOut: false },
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
      <div className="product-description">
        <h1>{product.brand}</h1>
        <h1>{product.name}</h1>
        <ul className="attributes">
          {product.attributes.map((attribute) => (
            <li key={attribute.name}>
              <h3>{attribute.name}:</h3>
              <div className="attribute">
                {attribute.type !== "swatch"
                  ? attribute.items.map((item) => (
                      <span key={item.id} className="text">
                        {item.displayValue}
                      </span>
                    ))
                  : attribute.items.map((item) => (
                      <span className="swatch" key={item.id}>
                        <div
                          style={{
                            backgroundColor: item.value,
                            color: "transparent",
                          }}
                        ></div>
                      </span>
                    ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  displayProductPage(product) {
    return (
      <div className="Product">
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
        {this.displayProductDescription(product)}
      </div>
    );
  }

  render() {
    const { data } = this.props;
    if (!data || data.loading) {
      return <Loader className="center-loader" />;
    }

    const { product } = this.state;
    return product ? this.displayProductPage(product) : null;
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
