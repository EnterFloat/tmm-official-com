// Call a Netlify function to check if payment has been fulfilled

import getStripeSession from './get-stripe-session.js';
import getStripePaymentIntent from './get-stripe-payment-intent.js';
import getAuth0User from './get-auth0-user.js';
import editFaunaDBUser from './edit-faunadb-user.js';


export default function isSuccessfulPurchase(sessionId) {
  console.log('handleCustomer');
  return new Promise((resolve, reject) => {
    getStripeSession(sessionId)
        .then(session => {
            console.log(session);
            console.log(session.payment_intent)
            return getStripePaymentIntent(session.payment_intent)
        })
        .then(paymentIntent => {
            console.log(paymentIntent);
            console.log(paymentIntent.status)
            // Set localStorage item
            localStorage.setItem('ownsTMS', true);
            return getAuth0User()
        })
        .then(result => {
          if (result == 'not_authenticated') {
            console.log('Not authenticated');
            reject("Error. User not authenticated. Could not save purchase")
          } else {
            var auth0_id = result.sub;
            console.log(auth0_id);
            // Get the FaunaDB user
            return editFaunaDBUser(auth0_id);
          }
        })
        .then(status => {
          resolve("succeeded")
        })
        .catch(error => {
            console.log('isSuccessfulPurchase error. Netlify function error: ' + error);
            reject("Error")
        });
  })
}