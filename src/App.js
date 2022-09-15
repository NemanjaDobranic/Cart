import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductListing from "./pages/productListing/ProductListing";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" component={ProductListing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
