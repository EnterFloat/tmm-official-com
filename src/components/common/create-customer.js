import createStripeCustomer from "./create-stripe-customer";
import createFaunaDBUser from "./create-faunadb-user";


export default function createCustomer(auth0_id, auth0_email) {
    console.log("createCustomer")
    return new Promise((resolve,reject) => {
        createStripeCustomer(auth0_id, auth0_email)
            .then(result => {
                console.log(result)
                var stripe_cus_id = result
                return createFaunaDBUser(auth0_id, stripe_cus_id)
            })
            .then(result => {
                console.log("FaunaDB user created with associated Stripe customer")
                resolve(result)
            })
            .catch(err => {
                console.log("Could not create customer/user: " + err)
                reject(err)
            })
    })
}