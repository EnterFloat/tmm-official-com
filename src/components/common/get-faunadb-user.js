// Get the data stored in the FaunaDB about a Auth0 user by calling a Netlify function

import axios from 'axios'

export default function getFaunaDBUser(auth0_id) {  
    console.log("getFaunaDBUser")
    return new Promise((resolve, reject) => {
      axios.post("/.netlify/functions/netlify-get-faunadb-user", {auth0_id: auth0_id})
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          if (error.response.data.requestResult.statusCode == "404"){
            resolve("no_faunadb_user")
          }
          reject("getFaunaDBUser error. Netlify function error: " + error)
        });
    })
  }