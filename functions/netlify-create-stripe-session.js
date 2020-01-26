// Netlify function to create a new Stripe session

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = (event, context, callback) => {
  const params = JSON.parse(event.body);
  const success_url =
    process.env.STRIPE_CALLBACK_SUCCESS + '?session_id={CHECKOUT_SESSION_ID}';
  console.log('\n\n\n' + success_url);
  const error_url = process.env.STRIPE_CALLBACK_ERROR;

  return stripe.checkout.sessions
    .create({
      customer: params.stripe_cus_id,
      mode: 'subscription',
      subscription_data: {
        items: [
          {
            plan: params.plan,
            quantity: 1,
          },
        ],
      },
      success_url: success_url,
      cancel_url: error_url,
      payment_method_types: ['card'],
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
