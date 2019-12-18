import { StaticQuery, graphql, Link } from 'gatsby';
import React from "react"
import ProductCard from './ProductCard.js'
import handleCustomer from './common/handle-customer.js'
import createStripeSession from './common/create-stripe-session.js'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  borderColor: "rgb(126,86,24)",
  letterSpacing: "1.5px",
  width: "100%",
}

const Product = class extends React.Component {
  constructor(props) {
    super(props);

    this.handlePurchase = this.handlePurchase.bind(this)
    this.redirectToCheckout = this.redirectToCheckout.bind(this)
    this.buttonText = this.buttonText.bind(this)

    this.state = {
      stripe: null,
      cus_subs: null,
    }
  }

  componentDidMount() {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
    const cus_subs = localStorage.getItem("customer_subscriptions")
    this.setState({ stripe, cus_subs})
  }

  buttonText(nickname, buttonDisabled) {
    if (buttonDisabled) {
      return "You are already subscriped to this product"
    }
    return nickname
  }

  redirectToCheckout(stripe_cus_id, stripe_plan_id) {
    console.log("redirectToCheckout with stripe_cus_id: " + stripe_cus_id)
    createStripeSession(stripe_cus_id, stripe_plan_id)
      .then(result => {
        return result
      })
      .then(result => {
        this.state.stripe.redirectToCheckout({
          sessionId: result
        }).then(function(result) {
          console.log(result.error.message)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  handlePurchase(stripe_plan_id) {
    // Get Stripe customer id
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result
        console.log(stripe_cus_id)
        // Redirect to checkout. Should create session first
          this.redirectToCheckout(stripe_cus_id, stripe_plan_id)
      })
      .catch(err => {
        if (err == "signed_out") {
          console.log("Sign in to continue")
          window.alert("Sign in to buy a product")
        } else {
          console.log("Could not create user: " + err)
        }
      })
  }


  render() {
    const { data } = this.props;

    var productId = this.props.id
    if (productId === undefined) {
        return (
            <Container>
                <h1>Product not found...</h1>
            </Container>
        )
    }
    var cus_subs = this.state.cus_subs
    console.log("cus_subs " + cus_subs)

    var plans_subbed = []
    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== "none") {
        cus_subs = JSON.parse(cus_subs).data
        for (const i in cus_subs) {
          console.log(cus_subs[i].plan.id)
          plans_subbed.push(cus_subs[i].plan.id)
      }
    }
    console.log("Plans subbed " + plans_subbed)


    var products = {}
    for (const i in data.allStripeProduct.edges) {
      var node = data.allStripeProduct.edges[i].node
      products[node.id] = node
    }
    var product = products[productId]
    console.log("Product " + product)

    var associatedPlans = []
    for (const i in data.allStripePlan.edges) {
      var node = data.allStripePlan.edges[i].node
      if (node.product == productId) {
        associatedPlans.push(node)
      }
    }

    var cus_subs = this.state.cus_subs
    console.log("cus_subs " + cus_subs)
    var plans_subbed = []

    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== "none") {
        cus_subs = JSON.parse(cus_subs).data
        for (const i in cus_subs) {
          console.log(cus_subs[i].plan.id)
          plans_subbed.push(cus_subs[i].plan.id)
      }
    }
    console.log("Plans subbed " + plans_subbed)

    var isDisabled = false
    for (const i in associatedPlans) {
      if (plans_subbed.includes(associatedPlans[i].id)) {
        var isDisabled = true
      }
    }



    return (
      <Container>
          <Link to={"/marketplace"}><Button variant="outline-secondary" style={{padding: "7px 25px", marginTop: "-35px"}}>&larr; Back</Button></Link>
          <h1>{product.name}</h1>
          <Row>
          {associatedPlans.map(( plan ) => (
            <>
            {/* <p>{plan.id}</p> */}
              <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
              style={{marginBottom: "20px"}}
              >
                <Button             
                style={buttonStyles}
                
                onClick={()=>this.handlePurchase(plan.id)}
                disabled={isDisabled}>        
                  {isDisabled ? 'You are subscribed' : plan.nickname}
                    {/* {this.buttonText(plan.nickname, isDisabled)} */}
                </Button>
              </Col>       
              <br></br>
              </> 
          ))}
          </Row>
      </Container>
    )
  }
}

Product.defaultProps = {
    id: undefined
  }

export default props => (
  <StaticQuery
    query={graphql`
      query ProductQuery {
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