// Netlify function to create a new FaunaDB user saving auth0_id and Stripe customer id

import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  const params = JSON.parse(event.body);

  const auth0_id = params.auth0_id;
    // .query(q.Update(q.Index(`user_by_auth0_id`, `${auth0_id}`), userItem))
  const userItem = {
    data: {ownsTMS: "true"},
  };
  return client
    .query(
      // q.Update(
        q.Get(q.Match(q.Index('user_by_auth0_id'), `${auth0_id}`))
        // q.Ref(q.Get(q.Match(q.Index(`user_by_auth0_id`), `${auth0_id}`))), `${userItem}`
      // )
    )
    .then(response => {
      console.log(response)
      console.log(response.ref)
      return client.query(
          q.Update(response.ref, userItem)
      )
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
