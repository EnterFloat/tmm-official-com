// Create a new FaunaDB user with fields auth0_id and stripe_cus_id

import axios from 'axios';

export default function editFaunaDBUser(auth0_id, data) {
  console.log('editFaunaDBUser');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-edit-faunadb-user', {
        auth0_id: auth0_id,
        data: data,
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
