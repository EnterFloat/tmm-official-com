import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Container,
  Card,
  Button,
} from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import '../assets/sass/_faq.scss';

var TriggerStyling = {
  width: 'available',
  backgroundColor: '#FFFFFF',
  // 8F0000
};

var openedCollapsible = {
  // width: "available",
  backgroundColor: 'yellow',
};
const Faq = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { data } = this.props;

    const CollapseContainer = styled.div`
      background-color: red;
      margin-bottom: 40px;
    `;

    return (
      <div style={{ paddingBottom: '60px' }}>
        <Container>
          {data.allSanityFaq.edges.map(({ node }) => (
            <>
              <Card>
                <Card.Header as="h5">{node.question}</Card.Header>
                <Card.Body>
                  <Card.Text>{node.answer}</Card.Text>
                </Card.Body>
              </Card>
              <br></br>
            </>
          ))}
        </Container>
        <br></br>
        <ActionButton>Take me to the Marketplace!</ActionButton>
      </div>
    );
  }
};
export default props => (
  <StaticQuery
    query={graphql`
      query FaqQuery {
        allSanityFaq {
          edges {
            node {
              question
              answer
              id
            }
          }
        }
      }
    `}
    render={data => <Faq data={data} {...props} />}
  />
);

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
              Take me to the Marketplace!
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
