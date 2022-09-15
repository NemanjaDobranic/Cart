import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductListing from "./pages/productListing/ProductListing";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductListing />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
