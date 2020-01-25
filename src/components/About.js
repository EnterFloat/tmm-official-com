import { StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Container, Carousel, Row, Col, Jumbotron, Card } from 'react-bootstrap';
import '../assets/sass/_page.scss';
import '../assets/sass/_about.scss';
import Img from 'gatsby-image';
import ModalVideo from 'react-modal-video'
import PlayIcon from '../assets/images/play-icon.png';

const About = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      interval: 5000
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal () {
    this.setState({isOpen: true, interval: 99999999})
  }
  
  componentDidMount() {}

  render() {
    const { data } = this.props;
    var carouselHeight = 225;
    return (
      <>
        <Row className={"carousel-row"}>
          <Col
            xs={{ span: 12, offset: 0 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
            xl={{ span: 6, offset: 3 }}
            style={{ marginBottom: '0px', padding: '0px' }}
          >
            <Container className={'carousel-container'} >
              <Carousel className={'carousel'} indicators={true} interval={this.state.interval}>
                {console.log(data.sanityAbout)}
              {data.sanityAbout.media.map(function(media, i) {
                console.log(media)
                  if (media.isImage) {
                    console.log(media.isImage)
                    return (
                      <Carousel.Item
                      >
                        <Img
                          
                          key={i}
                          fluid={media.image.asset.fluid}
                          />                    
                      </Carousel.Item>                    
                    );
                  } else {
                    var videoID = media.video.slice(-11)
                    {/* className="d-block w-100 h-100 carousel-item-container" */}
                    {/* className="carousel-item d-block h-100" */}
                    return (
                      <Carousel.Item
                      
                      >
                        <Img
                          
                          key={i}
                          fluid={media.image.asset.fluid}
                          />       
                          <div onClick={this.openModal} className="play-button-about"><img src={PlayIcon} className="play-image"></img></div>
                          <div style={{zIndex: "10000000"}}>
                              <ModalVideo style={{marginTop: "56px"}} channel='youtube' isOpen={this.state.isOpen} videoId={videoID} onClose={() => this.setState({isOpen: false, interval: 5000})} />
                          </div>             
                      </Carousel.Item>                    
                    );
                  }                  
                }, this)}
              {/* {data.sanityAbout.media.map(function(media, i) {
                
                      return (
                        <Carousel.Item>
                          <div className="d-block w-100 h-100 carousel-item-container">
                            
                            <Img
                              className="carousel-item d-block h-100"
                          key={i}
                          fluid={media.image.asset.fluid}
                              />                
                            </div>
                        </Carousel.Item>                    
                      );
                    })}               */}
              </Carousel>
            </Container>
          </Col>
        </Row>

        <Container
          style={{ paddingTop: '30px', paddingBottom: '30px' }}
        >
          <br></br>
          <h2>What is the Masculine Mentality?</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.sanityAbout.whatIsTMM}</p>
          <h2>About Hans Winther</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.sanityAbout.about}</p>
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
          media {
            isImage
            image {
              asset {
                fluid(maxWidth: 700) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            video
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