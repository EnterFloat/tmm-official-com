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
    var carouselHeight = 225
    return (
      <>
          <Container className={"carousel-container"}>
            <Carousel indicators={true} style={{height: carouselHeight + "px"}}>
      <Carousel.Item>
        <img 
          style={{width: "auto", height: "auto", maxHeight: carouselHeight + "px", objectFit: "cover"}}
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
        style={{width: "auto", height: "auto", maxHeight: carouselHeight + "px", objectFit: "cover"}}
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
        style={{width: "auto", height: "auto", maxHeight: carouselHeight + "px", objectFit: "cover"}}
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
    <hr/>

      <Container style={{marginTop: carouselHeight + "px", paddingBottom: "60px", color: "white", opacity: "0.95"}}>
        <br></br>
        <h2>What is the Masculine Mentality?</h2>
        <p>Let me tell you.</p>
        <br></br>
        <h2>About me</h2>
        <p>Let me tell you.</p>
        <br></br>
        <h2>About me</h2>
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