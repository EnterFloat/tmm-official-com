// Create Stripe session

import axios from 'axios'

export default function createStripeSession(stripe_cus_id, plan) {
    console.log("createStripeSession")
    return new Promise((resolve, reject) => {
        axios.post("/.netlify/functions/netlify-create-stripe-session", {stripe_cus_id: stripe_cus_id, plan: plan})
      .then(res => {
        resolve(res.data.id)
      })
      .catch(error => {
        reject(error)
      });
    })
}