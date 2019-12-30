import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import '../assets/sass/_tms.scss';
import Background from '../assets/images/tms.jpg';
import {Link} from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';


const MasculineSociety = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOpacity: 1,
      buttonVisibility: "visible",
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
    var opacity = 1
    var visibility = "visible";

    if (scrolled > 0.3 && scrolled <= 0.6) {
      opacity = -((scrolled - 0.3) / 0.3) + 1
    }

    if (scrolled > 0.6) {
      opacity = 0
    }
    if (opacity == 0) {
      visibility = "hidden";
    } else {
      visibility = "visible";
    }
  
    this.setState({
      buttonVisibility: visibility,
      buttonOpacity: opacity,
    })
  }

  render() {
    return (
      <>
      <div className="tms-image-container">
        <img className="tms-image" src={Background}></img>
      </div>
      <Container style={{ paddingBottom: '60px' }}>
        <br id="aboutTMS"></br>
        <h1>The Masculine Society</h1>
        <p>Video here</p>
      </Container>
      <ActionButton buttonOpacity={this.state.buttonOpacity} buttonVisibility={this.state.buttonVisibility}>Read more</ActionButton>
      </>
    );
  }
};
export default MasculineSociety;


function ActionButton(props) {
  return (
    <div className={'action-container'} style={ { opacity: `${ props.buttonOpacity * 100 }%`, visibility: `${ props.buttonVisibility }` } }
>
      <Row>
        <Col
          id={'Col1'}
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 4, offset: 1 }}
          lg={{ span: 3, offset: 1 }}
          xl={{ span: 2, offset: 1 }}
        >
          <Button className={'action-button'}
          onClick={() => scrollTo('#aboutTMS')}>
            {props.children}
          </Button>
        </Col>
      </Row>
    </div>
  );
}