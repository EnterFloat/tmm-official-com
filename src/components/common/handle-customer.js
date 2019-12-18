import getAuth0User from "./get-auth0-user.js"
import getFaunaDBUser from "./get-faunadb-user.js"
import getStripeCustomer from "./get-stripe-customer.js"
import createCustomer from "./create-customer.js"


export default function handleCustomer(purchase) {
    console.log("handleCustomer")
    return new Promise((resolve, reject) => {
        // Determine if the user wants to buy something or is just loading previous purchases.
        if (purchase === undefined) {
            // User not buying
            // Get the Auth0 ID
            getAuth0User()
                .then(result => {
                    if (result == "not_authenticated") {
                        console.log("Not authenticated")
                        return
                    } else {
                        var auth0_id = result.sub
                        console.log(auth0_id)
                        // Get the FaunaDB user
                        return getFaunaDBUser(auth0_id)
                    }
                })
                .then(result => {
                    if (result === undefined) return
                    if (result == "no_faunadb_user") {
                        console.log("Not a FaunaDB user. No previous purchases to display")
                        return
                    } else {               
                        if (result.data.stripe_cus_id != undefined) {
                            var stripe_cus_id = result.data.stripe_cus_id
                            // Use the Stripe customer id found in the FaunaDB to get the Stripe customer
                            return(getStripeCustomer(stripe_cus_id))
                        } else {
                            console.log("No field named 'stripe_cus_id' in FaunaDB object")
                            return
                        }
                    }
                })
                .then(result => {
                    if (result === undefined) return
                    if (result == "not_stripe_customer") {
                        console.log("Not a Stripe customer anymore. No previous purchases to display")
                        return
                    } else {      
                        if (result.subscriptions != undefined) {
                            var customer_subscriptions = result.subscriptions
                            console.log(customer_subscriptions)
                            // Save the subscriptions to localStorage to access on all pages
                            localStorage.setItem("customer_subscriptions", JSON.stringify(customer_subscriptions))        
                            return customer_subscriptions
                        } else {
                            console.log("No field named 'subscriptions' in Stripe object")
                            return
                        }
                    }
                })
                .then(result => {
                    if (result === undefined) {
                        localStorage.setItem("customer_subscriptions", "none")        
                    }
                    resolve("updated_localstorage")
                })
                .catch(err => {
                    // If an error occured along the way it will end up here
                    console.log("There was an error: " + err)
                    reject("error")
                })

        } else {
            //User buying
            // Get the Auth0 ID
            var auth0_id = ""
            var auth0_email = ""
            getAuth0User()
                .then(result => {
                    if (result == "not_authenticated") {
                        console.log("Not authenticated. Login to buy a product")
                        throw new Error("signed_out")
                    } else {
                        auth0_id = result.sub
                        auth0_email = result.email
                        console.log(auth0_id + ", " + auth0_email)
                        // Get the FaunaDB user
                        return getFaunaDBUser(auth0_id, auth0_email)
                    }
                })
                .then(result => {
                    if (result == "no_faunadb_user") {
                        console.log("Not a FaunaDB user. Creating Stripe customer and FaunaDB user")
                        return createCustomer(auth0_id, auth0_email)
                    } else {               
                        if (result.data.stripe_cus_id !== undefined) {
                            var stripe_cus_id = result.data.stripe_cus_id
                            console.log(stripe_cus_id)
                            // Use the Stripe customer id found in the FaunaDB to get the Stripe customer
                            return(stripe_cus_id)
                        } else {
                            console.log("No field named 'stripe_cus_id' in FaunaDB object")
                            return createCustomer(auth0_id, auth0_email)
                        }
                    }
                })
                .then(result => {
                    if (result == "not_stripe_customer") {
                        console.log("Not a Stripe customer anymore. Creating Stripe customer and FaunaDB user")
                        return createCustomer(auth0_id, auth0_email)
                    } else {      
                        return result
                    }
                })
                .then(result => {
                    console.log(result)
                    console.log("Time to create session, buy product, and reload localStorage")
                    resolve(result)
                })
                .catch(err => {
                    console.log("There was an error: " + err)
                    reject(err.message)
                })
        }
    })
}