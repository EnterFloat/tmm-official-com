// Load products

import { StaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import ProductCard from './ProductCard.js';
import { Container, Row, Col } from 'react-bootstrap';
import Img from 'gatsby-image';


const Checkout = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null,
    };
  }

  componentDidMount() {
    const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);
    const cus_subs = localStorage.getItem('customer_subscriptions');

    this.setState({ stripe, cus_subs });
  }

  render() {
    const { data } = this.props;

    var products = {};
    for (const i in data.allStripeProduct.edges) {
      var node = data.allStripeProduct.edges[i].node;
      products[node.id] = node;
    }


    console.log(products);
    var cus_subs = this.state.cus_subs;
    var plans_subbed = [];

    if (cus_subs !== null && cus_subs !== undefined && cus_subs !== 'none') {
      cus_subs = JSON.parse(cus_subs).data;
      for (const i in cus_subs) {
        plans_subbed.push(cus_subs[i].plan.id);
      }
      console.log(plans_subbed);
    }

    const stripeProducts = []
      .concat(data.allStripeProduct.edges)
      .sort((a, b) => a.name > b.name);

    console.log(data.allSanityProduct.edges[0].node.stripeId)

    var sanityProducts = {}
    for (const i in data.allSanityProduct.edges) {
      var node = data.allSanityProduct.edges[i].node;
      sanityProducts[node.stripeId] = node
    }
 

    return (
      <Container style={{ paddingBottom: '60px' }}>
        <Row>
          {stripeProducts.map(({ node }) => (
            <>            
            <Product
              sanityProducts={sanityProducts}
              key={node.id}
              product={node}
              products={products}
              stripe={this.state.stripe}
              prevPurchases={plans_subbed}
            />
            </>
          ))}
        </Row>
      </Container>
    );
  }
};
export default props => (
  <StaticQuery
    query={graphql`
      query CheckoutQuery {
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
  console.log(props.product);
  if (props.product.type == 'service') {
    console.log(props.sanityProducts[props.product.id])
    if (props.sanityProducts[props.product.id] === undefined) {
      return
    }
    return (
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 4, offset: 0 }}
          xl={{ span: 4, offset: 0 }}
          style={{ marginBottom: 30 }}
        >
        <Link to={'/marketplace/' + props.product.fields.slug}>

          {/* <Img style={{height: "200px"}} fluid={props.sanityProducts[props.product.id].banner.asset.fluid}></Img> */}
          <ProductCard
            key={props.key}
            product={props.product}
            products={props.products}
            stripe={props.stripe}
            prevPurchases={props.prevPurchases}
            imageFluid={props.sanityProducts[props.product.id].banner.asset.fluid}
          ></ProductCard>
          </Link>
        </Col>

    );
  }
  return '';
}
