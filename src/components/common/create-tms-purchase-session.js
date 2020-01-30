// Create Stripe purchase session

import axios from 'axios';

export default function createTmsPurchaseSession(stripe_cus_id, product_sku) {
  console.log("createTmsPurchaseSession ", stripe_cus_id)
  console.log("createTmsPurchaseSession ", product_sku)
  return new Promise((resolve, reject) => {
    axios
      .post('/.netlify/functions/netlify-buy-product-session-create', {
        stripe_cus_id: stripe_cus_id,
        product_sku: product_sku,
      })
      .then(res => {
        console.log(res)
        console.log(res.data.id)

        resolve(res.data.id);
      })
      .catch(error => {
        console.log("createTmsPurchaseSession ", error)
        reject(error);
      });
  });
}
