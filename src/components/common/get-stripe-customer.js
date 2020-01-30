// Call a Netlify function to retrieve a Stripe customer object from a customer id

import axios from 'axios';

export default function getStripeCustomer(stripe_id) {
  // console.log('getStripeCustomer');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-get-stripe-customer', {
        id: stripe_id,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        console.log("getStripeCustomer ",error)
        if (error.response.data.requestResult.statusCode === '500') {
          resolve('not_stripe_customer');
        }
        reject('getStripeCustomer error. Netlify function error: ' + error);
      });
  });
}
