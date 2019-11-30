function redirectToCheckout(stripe_cus_id) {
    console.log("redirectToCheckout with stripe_cus_id: " + stripe_cus_id)

    return new Promise((resolve, reject) => {
        const { error } = this.stripe.redirectToCheckout({
          items: [{plan: 'plan_GFHHCeBJ8rrPun', quantity: 1}],
          successUrl: `http://localhost:8000/success/`,
          cancelUrl: `http://localhost:8000/canceled`,
        }).then(resolve("success"))
        .catch(err => console.log(err))
    })
  }