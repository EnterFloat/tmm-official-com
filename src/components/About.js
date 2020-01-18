import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Container, Carousel, Row, Col, Jumbotron, Card } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import '../assets/sass/_about.scss';
import Img from 'gatsby-image';

const About = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { data } = this.props;
    var carouselHeight = 225;
    return (
      <>
        <Container className={'carousel-container'} >
          <Carousel className={'carousel'} indicators={true}>
          {data.sanityAbout.images.map(function(image, i) {
                  return (
                    <Carousel.Item>
                      <div className="d-block w-100 h-100 carousel-item-container">
                        
                        <Img className="carousel-item"
                          key={i}
                          fluid={image.asset.fluid}
                          
                          className="d-block h-100"
                          />                
                        </div>
                    </Carousel.Item>                    
                  );
                })}              
          </Carousel>
        </Container>

        <Container
          style={{ paddingTop: '30px', paddingBottom: '30px' }}
        >
          <br></br>
          <h2>What is the Masculine Mentality?</h2>
          <p>{data.sanityAbout.whatIsTMM}</p>
          <br></br>
          <h2>About me</h2>
          <p>{data.sanityAbout.about}</p>
        </Container>
        <div style={{paddingBottom: '60px', marginLeft: '0px', paddingLeft: '0px', marginRight: '0px', paddingRight: '0px', width: '100%'}}>
          <Jumbotron style={{ background: '#760000', borderRadius: '0px', marginLeft: '0px', marginRight: '0px', width: '100%' }}>
            <Row>
              <Col>
                <h2
                  style={{
                    color: 'white',
                    textAlign: 'right',
                    marginRight: '100px',
                  }}
                >
                  Recommendations
                </h2>
                <Row>
                  {data.sanityAbout.recommendations.map(function(recommendation, i) {
                    return (
                      <Col
                        xs={{ span: 12 }}
                        sm={{ span: 12 }}
                        md={{ span: 6 }}
                        lg={{ span: 3 }}
                        xl={{ span: 3 }}
                        style={{ marginBottom: '10px', padding: '10px 10px' }}
                      >
                        <Card style={{ padding: '8px' }}>
                          <Card.Title>{recommendation.title}</Card.Title>
                          <Card.Text>
                            {recommendation.details}
                            <br></br>
                            <p
                              style={{ textAlign: 'right', marginBottom: '0px' }}
                            >
                              {recommendation.author}
                            </p>
                          </Card.Text>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Jumbotron>
        </div>
      </>
    );
  }
};
export default props => (
  <StaticQuery
    query={graphql`
      query AboutQuery {
        sanityAbout {
          whatIsTMM
          about
          images {
            asset {
              fluid(maxWidth: 1200) {
                ...GatsbySanityImageFluid
              }
            }
          }
          recommendations {
            title
            details
            author
          }  
        }
      }
    `}
    render={data => <About data={data} {...props} />}
  />
);