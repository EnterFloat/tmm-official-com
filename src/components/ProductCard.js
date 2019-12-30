// Load individual product

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'gatsby';
import '../assets/sass/_page.scss';
import Img from 'gatsby-image';

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: '#760000',
  borderRadius: '6px',
  borderColor: '#A40000',
  letterSpacing: '1.5px',
  width: '100%',
};

const ProductCard = class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var product = this.props.product;
    console.log(this.props.imageFluid)
    return (
      <Card className="product-card shadow-box">
        <Img style={{width: "100%", height: "auto"}} fluid={this.props.imageFluid}></Img>
      </Card>
    );
  }
};

export default ProductCard;
