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

    const stripeProducts = [].concat(data.allStripeProduct.edges).sort((a, b) => a.name > b.name)
    
    return (
      <Container>
        <Row>
        {stripeProducts.map(({ node }) => (
          <Product key={node.id} product={node} products={products} stripe={this.state.stripe} prevPurchases={plans_subbed}/>
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
              type
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

function Product(props) {
  console.log(props.product)
  if (props.product.type == "service") {
    return (<Col
      xs={{ span: 10, offset: 1 }}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 6, offset: 0 }}
      lg={{ span: 4, offset: 0 }}
      xl={{ span: 4, offset: 0 }}
      style={{ marginBottom: 30}}
    >
     <ProductCard key={props.key} product={props.product} products={props.products} stripe={props.stripe} prevPurchases={props.prevPurchases}></ProductCard> 
    </Col>)
  }
  return ("")
}