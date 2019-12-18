// Load products

import { StaticQuery, graphql } from 'gatsby';
import React from "react"
import ProductCard from './ProductCard.js'
import { Container, Row, Col } from 'react-bootstrap';

const Checkout = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stripe: null,
    }
  }
  
  componentDidMount() {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
    const cus_subs = localStorage.getItem("customer_subscriptions")

    this.setState({ stripe, cus_subs})
  }

  render() {
    const { data } = this.props;

    var products = {}
    for (const i in data.allStripeProduct.edges) {
      var node = data.allStripeProduct.edges[i].node
      products[node.id] = node
    }
    console.log(products)
    var cus_subs = this.state.cus_subs
    var plans_subbed = []

    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== "none") {
        cus_subs = JSON.parse(cus_subs).data
        for (const i in cus_subs) {
          plans_subbed.push(cus_subs[i].plan.id)
      }
      console.log(plans_subbed)
    }
    
    return (
      <Container>
        <Row>
        {data.allStripePlan.edges.map(({ node }) => (
          <Col
            xs={{ span: 10, offset: 1 }}
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 0 }}
            lg={{ span: 4, offset: 0 }}
            xl={{ span: 4, offset: 0 }}
            style={{ marginBottom: 30}}
          >
              <ProductCard key={node.id} plan={node} products={products} stripe={this.state.stripe} prevPurchases={plans_subbed}></ProductCard>
          </Col>
        ))}
      </Row>
      </Container>
    )
  }
}
export default props => (
  <StaticQuery
    query={graphql`
      query CheckoutQuery {
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
    render={data => <Checkout data={data} {...props} />}
  />
);