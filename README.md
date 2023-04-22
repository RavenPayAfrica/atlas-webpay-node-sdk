# Atlas Pay by Raven

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]![License][github-license][[github-license-url]]

Atlas Pay by Raven bank allows you recieve payments and build powerful checkout experience on your website and apps, to use this you will need to create an account on raven atlas, visit, ["Raven bank"](https://getravenbank.com/raven-atlas) for more.

[**Live Demo**](https://getravenbank.com/)

## ✨ Features

- Card Payments. (Visa, MasterCard)
- USSD Payment.
- Bank Transfers.
- NQR Payments.
- Pay with Raven.

## Installation:

````bash
npm install atlas-pay-sdk

or

```bash
yarn add atlas-pay-sdk
````

## Usage :

Atlas-Pay provides you with few Javascript API's to interact with below is an example implementation of the atlas-pay library:

```js



import './App.css'
import  {AtlasPay}  from 'atlas-pay-sdk';

function App() {
  AtlasPay.onSuccess = function(data) {
    /**
     * handle successful payment
     * (optional) : you can decide to retrieve the onSuccess message we send via data
    **/
    console.log('Payment successful:', data);
  }

  AtlasPay.onClose = function(data) {
       /**
     * handle close event, this happens when user closes the payment modal
     * (optional) : you can decide to retrieve the onClose message we send via data
    **/
    console.log('Payment modal Closed:', data);
  }

  AtlasPay.onResponse = function(data) {
       /**
     * handle generate response, this triggers when you try generating a new ref via AtlasPay.generate(), you catch ther response here
     * (required) : you are to retrieve the response via the data returned
    **/
      console.log('We got a response:', data); // or do your stuff here
  }


  AtlasPay.onLoad = function(data) {
    /**
  * this triggers when the payment window is loaded onto your dom, it returns for you a payload containing the payment object.
  * (optional) : you can decide to retrieve the payment object we send via data
 **/
   console.log('Payment window loaded:', data); // or do your stuff here
}

  // set up your new payment parameters, along side your secret key

  let config = {
    "customer_email": "john@example.com",
    "description" : "test payment",
    "merchant_ref": "your_merchant_reference",
    "amount": 100,
    "redirect_url": "",
    "payment_methods" : "card,bank_transfer,ussd,raven",
    "secret_key" : "your_atlas_secret_key"
}


  return (
    <>
    {/* This button will fire the generate function */}
    <button onClick={()=> AtlasPay.generate(config)}>Generate New Ref</button>

    {/* This button will fire the init function and load up the payment window */}
     <button onClick={()=> AtlasPay.init('202304211026JBCAADE')}>Initialize Payment Window</button>
    </>
  )
}

export default App


```

[npm-url]: https://www.npmjs.com/package/raven-bank-ui
[npm-image]: https://img.shields.io/npm/v/my-react-typescript-package
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml

[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package
