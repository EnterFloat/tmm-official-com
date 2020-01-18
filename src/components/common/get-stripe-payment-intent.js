// Call a Netlify function to retrieve a Stripe Payment Intent

import axios from 'axios';

export default function getStripePaymentIntent(piId) {
  console.log('getStripeSession');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-get-stripe-payment-intent', {
        piId: piId,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject('getStripeSession error. Netlify function error: ' + error);
      });
  });
}
