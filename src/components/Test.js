import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import demoImage1 from '../assets/images/demo-image-01.jpg';

const Test = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <h1>Test</h1>
        <Container>
          <Carousel indicators={true} style={{ height: '300px' }}>
            <Carousel.Item>
              <img
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
                className="d-block w-100"
                src={demoImage1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
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
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
                className="d-block w-100"
                src={demoImage1}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </>
    );
  }
};
export default Test;
