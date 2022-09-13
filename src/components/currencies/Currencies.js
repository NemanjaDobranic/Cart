import React, { Component } from "react";
import "./Currencies.css";

import Arrow from "../../assets/icons/vector.svg";

class Currencies extends Component {
  state = {
    isOpened: false,
    classNames: {
      arrow: "",
    },
  };

  handleCurrenciesClick = () => {
    this.state.isOpened
      ? this.setState({
          isOpened: false,
          classNames: {
            arrow: "",
          },
        })
      : this.setState({
          isOpened: true,
          classNames: {
            arrow: "opened",
          },
        });
  };

  render() {
    return (
      <div className="Currencies" onClick={this.handleCurrenciesClick}>
        <span>$</span>
        <img
          className={this.state.classNames.arrow}
          src={Arrow}
          alt="currency arrow"
        />
      </div>
    );
  }
}

export default Currencies;
