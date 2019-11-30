import { graphql, StaticQuery } from 'gatsby';
// import React from 'react';
import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Products from '../components/Products'

class Marketplace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Products></Products>
    );
  }
}

export default Marketplace