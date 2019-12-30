// Netlify function to buy a product

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
  });
  var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  exports.handler = (event, context, callback) => {
    const params = JSON.parse(event.body);
    const success_url = process.env.STRIPE_CALLBACK_SUCCESS;
    const error_url = process.env.STRIPE_CALLBACK_ERROR;
  
    return stripe.checkout.sessions
      .create({
        customer: params.stripe_cus_id,
        mode: 'payment',
        success_url: success_url,
        cancel_url: error_url,
        payment_method_types: ['card'],
        line_items: [{
          name: 'The Masculine Society',
          description: 'Gain lifetime access to every product at The Masculine Society.',
          amount: 100000,
          currency: 'usd',
          quantity: 1,
        }],
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
  