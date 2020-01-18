// Call a Netlify function to retrieve a Stripe customer object from a customer id

import axios from 'axios';

export default function getStripeSession(sessionId) {
  console.log('getStripeSession');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-get-stripe-session', {
        sessionId: sessionId,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject('getStripeSession error. Netlify function error: ' + error);
      });
  });
}
