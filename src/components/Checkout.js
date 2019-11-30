import React from "react"
import handleCustomer from './common/handle-customer.js'
import createStripeSession from './common/create-stripe-session.js'



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

const Checkout = class extends React.Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  constructor(props) {
    // this.redirectToCheckout = this.redirectToCheckout.bind(this)

    super(props);

    this.handlePurchase = this.handlePurchase.bind(this)
    this.redirectToCheckout = this.redirectToCheckout.bind(this)

  }

  componentDidMount() {
    this.stripe = window.Stripe("pk_test_BtQvvH7PXmplDerVfYSQsmu500mjrA3cSK")
  }

  redirectToCheckout(stripe_cus_id) {
    console.log("redirectToCheckout with stripe_cus_id: " + stripe_cus_id)
    // this.stripe.checkout.create({
    //   items: [{plan: 'plan_GFHHCeBJ8rrPun', quantity: 1}],
    //   successUrl: `http://localhost:8000/success/`,
    //   cancelUrl: `http://localhost:8000/canceled`,
    // }, function(err, session) {
    //   console.log(err)
    //   console.log(session)
    // })
    createStripeSession(stripe_cus_id, "plan_GFHHCeBJ8rrPun")
      .then(result => {
        return result
      })
      .then(result => {
        this.stripe.redirectToCheckout({
          sessionId: result
        }).then(function(result) {
          console.log(result.error.message)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  

  handlePurchase(event) {
    // Get Stripe customer id
    event.preventDefault()
    handleCustomer(true)
      .then(result => {
        var stripe_cus_id = result
        console.log(stripe_cus_id)
        // Redirect to checkout. Should create session first
          this.redirectToCheckout(stripe_cus_id)
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
    return (
      <>
        <button
          style={buttonStyles}
          onClick={this.handlePurchase}
        >
          Buy
        </button>
      </>
    )
  }
}
export default Checkout