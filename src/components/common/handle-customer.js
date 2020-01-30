import getAuth0User from './get-auth0-user.js';
import getFaunaDBUser from './get-faunadb-user.js';
import getStripeCustomer from './get-stripe-customer.js';
import createCustomer from './create-customer.js';

export default function handleCustomer(purchase) {
  // console.log('handleCustomer');
  return new Promise((resolve, reject) => {
    // Determine if the user wants to buy something or is just loading previous purchases.
    if (purchase === undefined) {
      // User not buying
      // Get the Auth0 ID
      getAuth0User()
        .then(result => {
          if (result === 'not_authenticated') {
            return;
          } else {
            var auth0_id = result.sub;
            // Get the FaunaDB user
            return getFaunaDBUser(auth0_id);
          }
        })
        .then(result => {
          if (result === undefined) return;
          if (result === 'no_faunadb_user') {
            return;
          } else {
            if (result.data.stripe_cus_id !== undefined) {
              var stripe_cus_id = result.data.stripe_cus_id;
              localStorage.setItem('ownsTMS', result.data.ownsTMS);
              // Use the Stripe customer id found in the FaunaDB to get the Stripe customer
              return getStripeCustomer(stripe_cus_id);
            } else {
              return;
            }
          }
        })
        .then(result => {
          if (result === undefined) return;
          if (result === 'not_stripe_customer') {
            return;
          } else {
            if (result.subscriptions !== undefined) {
              var customer_subscriptions = result.subscriptions;
              // Save the subscriptions to localStorage to access on all pages
              localStorage.setItem(
                'customer_subscriptions',
                JSON.stringify(customer_subscriptions)
              );
              localStorage.setItem('customer', JSON.stringify(result));
              return customer_subscriptions;
            } else {
              return;
            }
          }
        })
        .then(result => {
          if (result === undefined) {
            localStorage.setItem('customer_subscriptions', 'none');
            localStorage.setItem('ownsTMS', 'false');
          }
          resolve('updated_localstorage');
        })
        .catch(err => {
          // If an error occured along the way it will end up here
          console.log("catch", err)
          reject('error');
        });
    } else {
      //User buying
      // Get the Auth0 ID
      var auth0_id = '';
      var auth0_email = '';
      getAuth0User()
        .then(result => {
          if (result === 'not_authenticated') {
            throw new Error('signed_out');
          } else {
            auth0_id = result.sub;
            auth0_email = result.email;
            // Get the FaunaDB user
            return getFaunaDBUser(auth0_id, auth0_email);
          }
        })
        .then(result => {
          if (result === 'no_faunadb_user') {
            console.log("no fauna user")
            return createCustomer(auth0_id, auth0_email);
          } else {
            if (result.data.stripe_cus_id !== undefined) {
              var stripe_cus_id = result.data.stripe_cus_id;
              // Use the Stripe customer id found in the FaunaDB to get the Stripe customer
              return stripe_cus_id;
            } else {
              return createCustomer(auth0_id, auth0_email);
            }
          }
        })
        .then(result => {
          if (result === 'not_stripe_customer') {
            return createCustomer(auth0_id, auth0_email);
          } else {
            return result;
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err.message);
        });
    }
  });
}
