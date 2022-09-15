import React, { Component } from "react";
import "./Currencies.css";
import { connect } from "react-redux";
import Arrow from "../../assets/icons/vector.svg";
import { setCurrency } from "../../resources/actions/navbarActions";

class Currencies extends Component {
  state = {
    isOpened: false,
    classNames: {
      arrow: "",
      dropdown: "",
    },
  };

  componentDidMount() {
    if (this.props.currencies) {
      const currency = this.props.currencies.find(
        (currency) => currency.label.toLowerCase() === "usd"
      );

      this.props.setCurrency(currency);
    }
  }

  componentDidUpdate() {
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
      isOpened: false,
      classNames: {
        arrow: "",
        dropdown: "hide",
      },
    });

    this.props.setCurrency(currency);
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
        <span>{this.props.currency ? this.props.currency.symbol : null}</span>
        <img
          className={this.state.classNames.arrow}
          src={Arrow}
          alt="currency arrow"
        />
        <ul className={"dropdown " + this.state.classNames.dropdown}>
          {this.props.currencies
            ? this.props.currencies.map((currency) => (
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

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => {
      dispatch(setCurrency(currency));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
