import { graphql, StaticQuery } from 'gatsby';
// import React from 'react';
import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Checkout from '../components/Checkout'

class Marketplace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Checkout></Checkout>
    );
  }
}

export default Marketplace