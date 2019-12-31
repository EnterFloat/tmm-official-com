import React, { Component } from 'react';
import Products from '../components/Products';

class Marketplace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <br></br>
        <Products></Products>
      </>
    );
  }
}

export default Marketplace;
