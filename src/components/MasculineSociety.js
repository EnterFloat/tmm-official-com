import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import {Link} from 'gatsby';

const MasculineSociety = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <>
      <Container>
        <br></br>
        <h1>MasculineSociety</h1>
        <p>Video here</p>
      </Container>
      <ActionButton>Buy now</ActionButton>
      </>
    );
  }
};
export default MasculineSociety;


function ActionButton(props) {
  return (
    <div className={'action-container'}>
      <Row>
        <Col
          id={'Col1'}
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
          xl={{ span: 4, offset: 4 }}
        >
          <Link to={'/marketplace'}>
            <Button className={'action-button'}>
              {props.children}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}