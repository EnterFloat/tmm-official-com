// Create Stripe session

import axios from 'axios';

export default function createStripeSession(stripe_cus_id, plan) {
  console.log('createStripeSession');
  console.log('createStripeSession ' + stripe_cus_id + " plan: " + plan);

  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-create-stripe-session', {
        stripe_cus_id: stripe_cus_id,
        plan: plan,
      })
      .then(res => {
        resolve(res.data.id);
      })
      .catch(error => {
        console.log('createStripeSession ' + error);
        reject(error);
      });
  });
}
