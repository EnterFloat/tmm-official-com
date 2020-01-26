import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import handleCustomer from './common/handle-customer.js';
import createStripeSession from './common/create-stripe-session.js';
import {
  Container,
  Row,
  Col,
  Card,
  Jumbotron,
  Button,
  Carousel,
} from 'react-bootstrap';
import Img from 'gatsby-image';
import '../assets/sass/_product.scss';
import scrollTo from 'gatsby-plugin-smoothscroll';
import ModalVideo from 'react-modal-video';
import PlayIcon from '../assets/images/play-icon.png';
import Dialog from './Dialog';

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: '#760000',
  borderRadius: '6px',
  borderColor: '#A40000',
  letterSpacing: '1.5px',
};
const buttonStylesCheckout = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: '#760000',
  borderRadius: '6px',
  borderColor: '#A40000',
  letterSpacing: '1.5px',
  width: '100%',
};

const Product = class extends React.Component {
  constructor(props) {
    super(props);

    this.handlePurchase = this.handlePurchase.bind(this);
    this.redirectToCheckout = this.redirectToCheckout.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.state = {
      stripe: null,
      cus_subs: null,
      isOpen: false,
      interval: 5000,
      dialogVisibility: 'hidden',
      dialogTitle: '',
      dialogMessage: '',
    };
    this.openModal = this.openModal.bind(this);
    this.setDialog = this.setDialog.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true, interval: 99999999 });
  }

  componentDidMount() {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
    const cus_subs = localStorage.getItem('customer_subscriptions');
    this.setState({ stripe, cus_subs });
  }

  buttonText(nickname, buttonDisabled) {
    if (buttonDisabled) {
      return 'You are already subscriped to this product';
    }
    return nickname;
  }

  redirectToCheckout(stripe_cus_id, stripe_plan_id) {
    createStripeSession(stripe_cus_id, stripe_plan_id)
      .then(result => {
        return result;
      })
      .then(result => {
        this.state.stripe
          .redirectToCheckout({
            sessionId: result,
          })
          .then(function(result) {
          });
      })
      .catch(err => {
      });
  }
  setDialog(visibility, title, message) {
    this.setState({
      dialogVisibility: visibility,
      dialogTitle: title,
      dialogMessage: message,
    });
  }

  handlePurchase(stripe_plan_id) {
    // Get Stripe customer id
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result;
        // Redirect to checkout. Should create session first
        this.redirectToCheckout(stripe_cus_id, stripe_plan_id);
      })
      .catch(err => {
        if (err === 'signed_out') {
          this.setDialog(
            'visible',
            'Info',
            'You must sign in to buy a product'
          );
        }
      });
  }

  render() {
    const { data } = this.props;

    var productId = this.props.id;
    if (productId === undefined) {
      return (
        <Container>
          <h1>Product not found...</h1>
        </Container>
      );
    }
    var cus_subs = this.state.cus_subs;
    var plans_subbed = [];
    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== 'none') {
      cus_subs = JSON.parse(cus_subs).data;
      for (const i in cus_subs) {
        plans_subbed.push(cus_subs[i].plan.id);
      }
    }
    var products = {};
    for (const i in data.allStripeProduct.edges) {
      var node = data.allStripeProduct.edges[i].node;
      products[node.id] = node;
    }
    var product = products[productId];

    var associatedPlans = [];
    for (const i in data.allStripePlan.edges) {
      var node = data.allStripePlan.edges[i].node;
      if (node.product === productId) {
        associatedPlans.push(node);
      }
    }

    var cus_subs = this.state.cus_subs;
    var plans_subbed = [];

    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== 'none') {
      cus_subs = JSON.parse(cus_subs).data;
      for (const i in cus_subs) {
        plans_subbed.push(cus_subs[i].plan.id);
      }
    }

    var isDisabled = false;
    for (const i in associatedPlans) {
      if (plans_subbed.includes(associatedPlans[i].id)) {
        var isDisabled = true;
      }
    }

    var sanityProducts = data.allSanityProduct;
    var sanityProduct = null;
    for (const i in sanityProducts.edges) {
      if (sanityProducts.edges[i].node.stripeId === productId) {
        sanityProduct = sanityProducts.edges[i].node;
      }
    }
    if (sanityProduct === null) {
      return (
        <Container style={{ paddingTop: '44px' }}>
          <Link to={'/marketplace'}>
            <Button
              variant="outline-secondary"
              style={{ padding: '7px 25px', marginTop: '-35px' }}
            >
              &larr; Back
            </Button>
          </Link>
          <h1>Product metadata could not be loaded...</h1>
        </Container>
      );
    }
    return (
      <>
        <Dialog
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          visibility={this.state.dialogVisibility}
          setState={p => {
            this.setState(p);
          }}
          parentState={this.state}
        />
        <Jumbotron
          style={{
            padding: '0px',
          }}
        >
          <Row>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 5 }}
              xl={{ span: 4 }}
              className="title-col"
            >
              <Container className={'title-box'} style={{ textAlign: 'right' }}>
                <h1>{product.name}</h1>
                <p>{sanityProduct.description}</p>
                <p>
                  <Button
                    style={buttonStyles}
                    disabled={isDisabled}
                    onClick={() => scrollTo('#plans')}
                  >
                    {isDisabled ? 'You are subscribed' : 'Purchase now'}
                  </Button>
                </p>
              </Container>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 7 }}
              xl={{ span: 8 }}
              style={{ padding: '0px' }}
            >
              <Carousel
                indicators={true}
                interval={this.state.interval}
                style={{
                  width: '100%',
                  height: +'auto',
                  minHeight: '200 px',
                  backgroundColor: '#d1d1d1',
                }}
              >
                {sanityProduct.media.map(function(media, i) {
                  if (media.isImage) {
                    return (
                      <Carousel.Item>
                        <Img
                          style={{
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'cover',
                          }}
                          key={i}
                          fluid={media.image.asset.fluid}
                          className="d-block w-100"
                        />
                      </Carousel.Item>
                    );
                  } else {
                    var videoID = media.video.slice(-11);
                    return (
                      <Carousel.Item>
                        <Img
                          style={{
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'cover',
                          }}
                          key={i}
                          fluid={media.image.asset.fluid}
                          className="d-block w-100"
                        />
                        <div
                          onClick={this.openModal}
                          className="play-button-product"
                        >
                          <img src={PlayIcon} className="play-image"></img>
                        </div>
                        <div style={{ zIndex: '10000000' }}>
                          <ModalVideo
                            style={{ marginTop: '56px' }}
                            channel="youtube"
                            isOpen={this.state.isOpen}
                            videoId={videoID}
                            onClose={() =>
                              this.setState({ isOpen: false, interval: 5000 })
                            }
                          />
                        </div>
                      </Carousel.Item>
                    );
                  }
                }, this)}
              </Carousel>
            </Col>
          </Row>
        </Jumbotron>
        <Container>
          <Link to={'/marketplace'}>
            <Button
              variant="outline-secondary"
              style={{ padding: '7px 25px', marginTop: '-35px' }}
            >
              &larr; Back
            </Button>
          </Link>
          <Row style={{ margin: '40px 0px' }}>
            <Col>
              <h2>Details</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{sanityProduct.details}</p>
            </Col>
          </Row>
        </Container>
        <Jumbotron style={{ background: '#760000', borderRadius: '0px' }}>
          <Row>
            <Col>
              <h2
                style={{
                  color: 'white',
                  textAlign: 'right',
                  marginRight: '100px',
                }}
              >
                Reviews
              </h2>
              <Row>
                {sanityProduct.reviews.map(function(review, i) {
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
                        <Card.Title>{review.title}</Card.Title>
                        <Card.Text>
                          {review.details}
                          <br></br>
                          <p
                            style={{ textAlign: 'right', marginBottom: '0px' }}
                          >
                            {review.author}
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
        <Container style={{ paddingBottom: '60px' }}>
          <Row style={{ marginTop: '40px' }}>
            <Col>
              <h2>Advantages</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {sanityProduct.advantages}
              </p>
            </Col>
          </Row>

          <Row id="plans">
            <Col>
              <br></br>
              <br></br>
            </Col>
          </Row>
          <Container className="plan-container">
            <Row style={{ textAlign: 'center' }}>
              {associatedPlans.map(plan => (
                <>
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 6 }}
                    lg={{ span: 6 }}
                    xl={{ span: 6 }}
                    style={{ marginBottom: '10px', padding: '10px 10px' }}
                    className="col-centered"
                  >
                    <Card>
                      <Card.Header>
                        <h4 style={{ textAlign: 'center' }}>{plan.nickname}</h4>
                      </Card.Header>
                      <Card.Body>
                        <h5>
                          {plan.amount / 100}{' '}
                          <span style={{ color: 'grey' }}>
                            {' '}
                            {plan.currency.toUpperCase()}
                          </span>
                        </h5>
                        <p></p>
                        <Button
                          style={buttonStylesCheckout}
                          onClick={() => this.handlePurchase(plan.id)}
                          disabled={isDisabled}
                        >
                          {isDisabled ? 'You are subscribed' : 'Go to checkout'}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <br></br>
                </>
              ))}
            </Row>
          </Container>
          <br></br>
          <br></br>
        </Container>
      </>
    );
  }
};

Product.defaultProps = {
  id: undefined,
};

export default props => (
  <StaticQuery
    query={graphql`
      query ProductQuery {
        allSanityProduct {
          edges {
            node {
              id
              stripeId
              description
              banner {
                asset {
                  fluid(maxWidth: 700) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
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
              reviews {
                title
                details
                author
              }
              tags
              details
              advantages
            }
          }
        }
        allStripePlan {
          edges {
            node {
              id
              product
              amount
              nickname
              currency
              livemode
            }
          }
        }
        allStripeProduct {
          edges {
            node {
              id
              name
              livemode
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => <Product data={data} {...props} />}
  />
);
