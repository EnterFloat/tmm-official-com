// Netlify function to create a new Stripe customer

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = (event, context, callback) => {
  const params = JSON.parse(event.body);

  return stripe.customers
    .create({
      email: params.email,
      description: params.auth0_id,
    })
    .then(response => {
      console.log('success', response);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    })
    .catch(error => {
      console.log('error', error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
