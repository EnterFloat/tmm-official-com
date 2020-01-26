// Call a Netlify function to check if payment has been fulfilled

import getStripeSession from './get-stripe-session.js';
import getStripePaymentIntent from './get-stripe-payment-intent.js';
import getAuth0User from './get-auth0-user.js';
import editFaunaDBUser from './edit-faunadb-user.js';

export default function isSuccessfulPurchase(sessionId) {
  // console.log('handleCustomer');
  return new Promise((resolve, reject) => {
    getStripeSession(sessionId)
      .then(session => {
        return getStripePaymentIntent(session.payment_intent);
      })
      .then(paymentIntent => {
        // Set localStorage item
        localStorage.setItem('ownsTMS', true);
        return getAuth0User();
      })
      .then(result => {
        if (result === 'not_authenticated') {
          reject('Error. User not authenticated. Could not save purchase');
        } else {
          var auth0_id = result.sub;
          // Get the FaunaDB user
          return editFaunaDBUser(auth0_id, { ownsTMS: 'true' });
        }
      })
      .then(status => {
        resolve('succeeded');
      })
      .catch(error => {
        reject('Error');
      });
  });
}
