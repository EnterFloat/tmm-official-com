import { StaticQuery, graphql } from 'gatsby';
import React from "react"
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import '../assets/sass/_page.scss'
import demoImage1 from '../assets/images/demo-image-01.jpg';

const About = class extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    
    return (
      <>
          <Container className={"carousel-container"}>
            <Carousel indicators={true} style={{height: "300px"}}>
      <Carousel.Item>
        <img 
          style={{width: "auto", height: "auto", maxHeight: "300px", objectFit: "cover"}}
          className="d-block w-100"
          src={demoImage1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{width: "auto", height: "auto", maxHeight: "300px", objectFit: "cover"}}
          className="d-block w-100"
          src={demoImage1}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
        style={{width: "auto", height: "auto", maxHeight: "300px", objectFit: "cover"}}
          className="d-block w-100"
          src={demoImage1}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>
      <Container style={{marginTop: "300px"}}>
        <br></br>
        <h2>What is the Masculine Mentality?</h2>
        <p>Let me tell you.</p>
        <br></br>
        <h2>About me</h2>
        <p>Let me tell you.</p>
      </Container>
      </>
    )
  }
}
export default About;