import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import '../assets/sass/_faq.scss';

const Faq = class extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div style={{ paddingBottom: '60px' }}>
        <Container>
          <h2 style={{ marginBottom: '20px' }}>FAQ</h2>
          {data.allSanityFaq.edges.map(({ node }) => (
            <>
              <Card className="shadow-box">
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
