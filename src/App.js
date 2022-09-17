import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductListing from "./pages/productListing/ProductListing";
import ProductDescription from "./pages/productDescription/ProductDescription";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={ProductListing} />
            <Route
              path="/product-decription/:id"
              component={ProductDescription}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
