// Netlify function to get a Stripe Session by id

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = (event, context, callback) => {
  const params = JSON.parse(event.body);
  console.log(params.sessionId);
  return stripe.checkout.sessions
    .retrieve(params.sessionId)
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
