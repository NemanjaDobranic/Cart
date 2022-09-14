import React, { Component } from "react";
import "./Currencies.css";

import Arrow from "../../assets/icons/vector.svg";

class Currencies extends Component {
  state = {
    selected: null,
    currencies: null,
    isOpened: false,
    classNames: {
      arrow: "",
    },
  };

  componentDidUpdate() {
    if (!this.state.currencies && this.props.currencies) {
      this.setState({
        ...this.state,
        currencies: this.props.currencies,
        selected: this.props.currencies.find((currency) => {
          if (currency.label.toLowerCase() === "usd") return currency;
        }),
      });
    }
  }

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
        <span>{this.state.selected ? this.state.selected.symbol : null}</span>
        <img
          className={this.state.classNames.arrow}
          src={Arrow}
          alt="currency arrow"
        />
        <ul className="dropdown">
          {this.state.currencies
            ? this.state.currencies.map((currency) => (
                <li key={currency.label}>
                  {currency.symbol}&nbsp;{currency.label}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default Currencies;
