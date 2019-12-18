// Load individual product

import React from "react"
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {Link} from 'gatsby'
import '../assets/sass/_page.scss'


const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  borderColor: "rgb(126,86,24)",
  letterSpacing: "1.5px",
  width: "100%",
}

const ProductCard = class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var product = this.props.product

    return (
        <Card
        style={{backgroundColor: "white"}}
        >
            <h4 style={{color: "black", opacity: "0.95"}}>{product.name}</h4>
            <Row>
              <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
              >
              <Link to={"/marketplace/" + product.fields.slug}>
                <Button             
                style={buttonStyles}
                >        
                  Read more
                </Button>
                </Link>
              </Col>        
            </Row>
            <br></br>
        </Card>
    )
  }
}

export default ProductCard