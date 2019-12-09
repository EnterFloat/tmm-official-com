// Load individual product

import React from "react"
import handleCustomer from './common/handle-customer.js'
import createStripeSession from './common/create-stripe-session.js'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {Link} from 'gatsby'


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
}

const ProductCard = class extends React.Component {
  constructor(props) {
    super(props);

    this.handlePurchase = this.handlePurchase.bind(this)
    this.redirectToCheckout = this.redirectToCheckout.bind(this)

  }

  redirectToCheckout(stripe_cus_id, stripe_plan_id) {
    console.log("redirectToCheckout with stripe_cus_id: " + stripe_cus_id)
    createStripeSession(stripe_cus_id, stripe_plan_id)
      .then(result => {
        return result
      })
      .then(result => {
        this.props.stripe.redirectToCheckout({
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
    var plan = this.props.plan
    var products = this.props.products
    var product = products[plan.product]

    var isDisabled = false
    var buttonText = plan.nickname

    if (this.props.prevPurchases.includes(plan.id)) {
        isDisabled = true
        buttonText += " (You own this product)"
    }
    return (
        <Card
        style={{backgroundColor: "transparent"}}
        >
            <h4 style={{color: "white", opacity: "0.95"}}>{product.name}</h4>
            <Button 
            style={buttonStyles}
            onClick={()=>this.handlePurchase(plan.id)}
            disabled={isDisabled}>        
                {buttonText}
            </Button>
        </Card>
    )
  }
}

export default ProductCard