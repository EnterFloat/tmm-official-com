// Get the data stored in the FaunaDB about a Auth0 user by calling a Netlify function

import axios from 'axios';

export default function getFaunaDBUser(auth0_id, email) {
  // console.log('getFaunaDBUser');
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-get-faunadb-user', {
        auth0_id: auth0_id,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        console.log("getFaunaDBUser " + error)
        console.log(error.response.data.requestResult.statusCode)
        if (error.response.data.requestResult.statusCode === 404 || error.response.data.requestResult.statusCode === 400) {
          console.log("no_faunadb_user")
          resolve('no_faunadb_user');
        }
        reject('getFaunaDBUser error. Netlify function error: ' + error);
      });
  });
}
