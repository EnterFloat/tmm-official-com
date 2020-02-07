// Create new Stripe customer with associated auth0_id and email for auto fill

import axios from 'axios';

export default function createStripeCustomer(auth0_id, auth0_email) {
  console.log('createStripeCustomer');
  console.log("auth0_id: " + auth0_id + " email: " + auth0_email)
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-create-stripe-customer', {
        auth0_id: auth0_id,
        email: auth0_email,
      })
      .then(res => {
        resolve(res.data.id);
      })
      .catch(error => {
        console.log("createStripeCustomer ",error)
        // console.log("createStripeCustomer ",error.response.data.requestResult.body)
        // console.log("createStripeCustomer ",error.response.data.requestResult.statusCode)

        reject(error);
      });
  });
}
