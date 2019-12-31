// Load individual product

import React from 'react';
import { Card } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import Img from 'gatsby-image';


const ProductCard = class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card className="product-card shadow-box">
        <Img style={{width: "100%", height: "auto"}} fluid={this.props.imageFluid}></Img>
      </Card>
    );
  }
};

export default ProductCard;
