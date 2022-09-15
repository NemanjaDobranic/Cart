import React, { Component } from "react";
import "./productListing.css";
import { connect } from "react-redux";

class ProductListing extends Component {
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return <div>Hello</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    categoryName: state.categoryName,
  };
};

export default connect(mapStateToProps)(ProductListing);
