import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "React from Fb",
    price: 10,
    productBy: "facebook",
  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8000/payment`, {
      method: 'POST',
      headers:token,
      body: JSON.stringify(token)
    }).then(response=>{
      console.log(`Response`,response);
      const {status}=response;
      console.log(`STATUS` ,status);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  // const makePayment=(token) => {
  //   console.log('token :>> ', token);
  //   fetch('/save-stripe-token', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then(response => {
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // }

  return (
    <div className="App">
      <StripeCheckout
      stripeKey='pk_test_51KmNqmSDZAQp6joF1jX8DrubKl6U8mtkxyxb1EIDeBOlKFEBoeNxPDAfui6dgPKpVJMkzc2bg9hv05BXe1Mt80qd00yfPhP96Y'
        token={makePayment}
        name="buy React"
        amount={product.price * 100}
      >
        <button className="btn-large btn-primary blue">

          React course {product.price}
        </button>
      </StripeCheckout>
    </div>
  );
}

export default App;
