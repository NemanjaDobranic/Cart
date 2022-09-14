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
      dropdown: "",
    },
  };

  componentDidUpdate() {
    if (!this.state.currencies && this.props.currencies) {
      this.setState({
        ...this.state,
        currencies: this.props.currencies,
        selected: this.props.currencies.find(
          (currency) => currency.label.toLowerCase() === "usd"
        ),
      });
    }

    this.state.isOpened
      ? document.addEventListener("mousedown", this.handleClickOutside)
      : document.removeEventListener("mousedown", this.handleClickOutside);
  }

  openCurrencies = () => {
    this.state.isOpened
      ? this.setState({
          isOpened: false,
          classNames: {
            arrow: "",
            dropdown: "hide",
          },
        })
      : this.setState({
          isOpened: true,
          classNames: {
            arrow: "rotate",
            dropdown: "show",
          },
        });
  };

  setActiveCurrency = (currency) => {
    this.setState({
      ...this.state,
      isOpened: false,
      classNames: {
        arrow: "",
        dropdown: "hide",
      },
      selected: currency,
    });
  };

  handleClickOutside = (e) => {
    const concernedElement = document.querySelector(".Currencies");

    if (!concernedElement.contains(e.target)) {
      this.setState({
        ...this.state,
        isOpened: false,
        classNames: {
          arrow: "",
          dropdown: "hide",
        },
      });
    }
  };

  render() {
    return (
      <div className="Currencies" onClick={this.openCurrencies}>
        <span>{this.state.selected ? this.state.selected.symbol : null}</span>
        <img
          className={this.state.classNames.arrow}
          src={Arrow}
          alt="currency arrow"
        />
        <ul className={"dropdown " + this.state.classNames.dropdown}>
          {this.state.currencies
            ? this.state.currencies.map((currency) => (
                <li
                  key={currency.label}
                  onClick={() => this.setActiveCurrency(currency)}
                >
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
