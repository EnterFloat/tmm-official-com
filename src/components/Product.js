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
    };
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
    console.log('redirectToCheckout with stripe_cus_id: ' + stripe_cus_id);
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
            console.log(result.error.message);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePurchase(stripe_plan_id) {
    // Get Stripe customer id
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result;
        console.log(stripe_cus_id);
        // Redirect to checkout. Should create session first
        this.redirectToCheckout(stripe_cus_id, stripe_plan_id);
      })
      .catch(err => {
        if (err == 'signed_out') {
          console.log('Sign in to continue');
          window.alert('Sign in to buy a product');
        } else {
          console.log('Could not create user: ' + err);
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
    console.log('cus_subs ' + cus_subs);

    var plans_subbed = [];
    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== 'none') {
      cus_subs = JSON.parse(cus_subs).data;
      for (const i in cus_subs) {
        console.log(cus_subs[i].plan.id);
        plans_subbed.push(cus_subs[i].plan.id);
      }
    }
    console.log('Plans subbed ' + plans_subbed);

    var products = {};
    for (const i in data.allStripeProduct.edges) {
      var node = data.allStripeProduct.edges[i].node;
      products[node.id] = node;
    }
    var product = products[productId];
    console.log('Product ' + product);

    var associatedPlans = [];
    for (const i in data.allStripePlan.edges) {
      var node = data.allStripePlan.edges[i].node;
      if (node.product == productId) {
        associatedPlans.push(node);
      }
    }

    var cus_subs = this.state.cus_subs;
    console.log('cus_subs ' + cus_subs);
    var plans_subbed = [];

    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== 'none') {
      cus_subs = JSON.parse(cus_subs).data;
      for (const i in cus_subs) {
        console.log(cus_subs[i].plan.id);
        plans_subbed.push(cus_subs[i].plan.id);
      }
    }
    console.log('Plans subbed ' + plans_subbed);

    var isDisabled = false;
    for (const i in associatedPlans) {
      if (plans_subbed.includes(associatedPlans[i].id)) {
        var isDisabled = true;
      }
    }

    var sanityProducts = data.allSanityProduct;
    var sanityProduct = null;
    for (const i in sanityProducts.edges) {
      console.log([sanityProducts.edges[i].node.stripeId, productId]);
      if (sanityProducts.edges[i].node.stripeId == productId) {
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

    console.log('\n\n\nSanity product ' + sanityProduct);
    var carouselHeight = 350;

    return (
      <>
        <Jumbotron
          style={{
            padding: "0px"
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
                  {/* <Link
                    to={'marketplace/' + product.id.toLowerCase() + '/#plans'}
                  > */}
                    <Button style={buttonStyles}
                    disabled={isDisabled}
                    onClick={() => scrollTo('#plans')}
                        >
                          {isDisabled ? 'You are subscribed' : 'Purchase now'}
                    </Button>
                  {/* </Link> */}
                  {/* 'marketplace/' + product.id.toLowerCase() + '/ */}
                </p>
              </Container>
            </Col>
            <Col
              xs={{ span: 12 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 7 }}
              xl={{ span: 8 }}
            >
              <Carousel
                indicators={true}
                style={{ width: '100%', height: carouselHeight + 'px' }}
              >
                {sanityProduct.images.map(function(image, i) {
                  console.log(image);
                  return (
                    <Carousel.Item>
                      <Img style={{
                          width: 'auto',
                          height: carouselHeight + "px",                          
                          objectFit: 'cover',
                        }}
                        key={i}
                        fluid={image.asset.fluid}
                        className="d-block w-100"
                        />                    
                    </Carousel.Item>                    
                  );
                })}                
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
          <Row style={{margin: "40px 0px"}}>
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
                  console.log(review);
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
          <Row style={{marginTop: "40px"}}>
            <Col>
              <h2>Advantages</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {sanityProduct.advantages}
              </p>
            </Col>
          </Row>

          <Row id="plans">
            <Col>
              {/* <h2>Available plans</h2> */}
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
                        <h5>{plan.trial_period_days} day trial</h5>
                        <p></p>
                        <Button
                          style={buttonStylesCheckout}
                          onClick={() => this.handlePurchase(plan.id)}
                          disabled={isDisabled}
                        >
                          {isDisabled ? 'You are subscribed' : 'Go to checkout'}
                          {/* {this.buttonText(plan.nickname, isDisabled)} */}
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
              images {
                asset {
                  fluid(maxWidth: 900) {
                    ...GatsbySanityImageFluid
                  }
                }
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
              trial_period_days
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