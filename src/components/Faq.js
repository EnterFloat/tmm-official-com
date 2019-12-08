import { StaticQuery, graphql, Link } from 'gatsby';
import React from "react"
import { Container as BootstrapContainer, Row, Col, Container, Card, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import '../assets/sass/_faq.scss'


var TriggerStyling = {
  width: "available",
  backgroundColor: "#FFFFFF"
  // 8F0000
}

var openedCollapsible = {
  // width: "available",
  backgroundColor: "yellow"
}
const Faq = class extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {

    const CollapseContainer = styled.div`
      background-color: red;
      margin-bottom: 40px;
    `;
    
    return (
      <div style={{paddingBottom: "60px"}}>
        <br></br>
        <Container>
          <Card>
            <Card.Header as="h5">Question 1</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 1. Collapsible coming soon...
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 2</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 2. Collapsible coming soon...
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 3</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 3. Collapsible coming soon...
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 4</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 4. Collapsible coming soon...
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 5</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 5
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 6</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 6
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <Card>
            <Card.Header as="h5">Question 7</Card.Header>
            <Card.Body>
              <Card.Text>
                Answer to question 7
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        <br></br>
        <ActionButton>Take me to the Marketplace!</ActionButton>
      </div>
    )
  }
}
export default Faq;

function ActionButton(props) {
  return <div className={"action-container"}>
          <Row>
            <Col
              id={"Col1"}
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              md={{ span: 6, offset: 3 }}
              lg={{ span: 4, offset: 4 }}
              xl={{ span: 4, offset: 4 }}
            >
              <Link to={"/marketplace"}><Button className={"action-button"}>Take me to the Marketplace!</Button></Link>
            </Col>
          </Row>
        </div>
}

