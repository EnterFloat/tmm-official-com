import { StaticQuery, graphql } from 'gatsby';
import React from "react"
import ProductCard from './ProductCard.js'
import { Row, Col } from 'react-bootstrap';

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

    var cus_subs = this.state.cus_subs
    var plans_subbed = []

    if (cus_subs !== null && cus_subs !== undefined) {
        cus_subs = JSON.parse(cus_subs).data
        for (const i in cus_subs) {
          console.log(cus_subs[i].plan.id)
          plans_subbed.push(cus_subs[i].plan.id)
      }
      console.log(plans_subbed)
    }
    
    return (
      <>
        <Row>
        {data.allStripePlan.edges.map(({ node }) => (
          <Col
            xs={{ span: 8, offset: 2 }}
            sm={{ span: 10, offset: 1 }}
            md={{ span: 4, offset: 1 }}
            lg={{ span: 4, offset: 1 }}
            xl={{ span: 4, offset: 1 }}
            style={{ marginBottom: 30}}
          >
              <ProductCard key={node.id} plan={node} products={products} stripe={this.state.stripe} prevPurchases={plans_subbed}></ProductCard>
          </Col>
        ))}
      </Row>
      </>
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
            }
          }
        }
      }
    `}
    render={data => <Checkout data={data} {...props} />}
  />
);