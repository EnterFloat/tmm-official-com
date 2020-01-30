// Netlify function to get FaunaDB user by auth0_id

import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  const params = JSON.parse(event.body);
  const auth0_id = params.auth0_id;
  console.log(auth0_id)
  return client
    .query(q.Get(q.Match(q.Index(`user_by_auth0_id`), `${auth0_id}`)))
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
