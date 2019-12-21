// Create a new FaunaDB user with fields auth0_id and stripe_cus_id

import axios from 'axios';

export default function createFaunaDBUser(auth0_id, stripe_cus_id) {
  console.log('createFaunaDBUser');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-create-faunadb-user', {
        auth0_id: auth0_id,
        stripe_cus_id: stripe_cus_id,
      })
      .then(res => {
        resolve(stripe_cus_id);
      })
      .catch(error => {
        reject(error);
      });
  });
}
