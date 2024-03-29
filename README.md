# Atlas Pay by Raven

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
[![npm-typescript]][npm-typescript]
[![github-license]][github-license]

Atlas Pay by Raven bank allows you recieve payments and build powerful checkout experience on your website and apps, to use this you will need to create an account on raven atlas, visit, ["Raven bank"](https://getravenbank.com/raven-atlas) for more.

[**Live Demo**](https://getravenbank.com/)

## ✨ Features

### New
- Compatibility in all JavaScript environments, including RequireJS and script tags.

### Existing

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
import  AtlasPay  from 'atlas-pay-sdk';

function App() {
  AtlasPay.onSuccess = function(data) {
    /**
     * handle successful payment
     * (optional) : you can decide to retrieve the onSuccess message we send via data, the message contains the payload of the successful payment.
    **/
    console.log('Payment successful:', data);
  }

  AtlasPay.onClose = function(data) {
       /**
     * handle close event, this happens when user closes the payment modal
     * (optional) : you can decide to retrieve the onClose message we send via data
     * (optional) : if you want to force close the payment window on onClose you can call the shutdown API within the onClose
     * (note) : this also triggers when the close modal button is clicked after successful paymen, but the message returned is 'payment_successful' , you can hook into this and do your magic.
    **/

    console.log('Payment modal Closed:', data);

    // optional shutdown
    AtlasPay.shutdown()
  }

  AtlasPay.shutdown() /* This closes the payment window and removes it from your DOM */

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
    "public_key" : "your_atlas_secret_key"
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

In the example above, we created two functions that you can call to initiate the payment window and generate new payment references.

## Integration

**Browsers**

``` html
<script src="https://cdn.jsdelivr.net/npm/atlas-pay-sdk@[version]/dist/index.min.js"></script>

<!-- Remember to change the [version] with the actual version you need, it is adviceable to always use the recent versions -->

```

After adding the script tag you now have access to `AtlasPaySdk` Object on your browser, refer to the usage for implementation but replace `AtlasPay` with `AtlasPaySdk` i.e `AtlasPaySdk.init()`.


**RequireJS**

If you are using RequireJS, you can include Atlas-Pay-SDK like this:


``` js
require(['path/to/atlas-pay-sdk'], function (AtlasPay) {

  // Use AtlasPay object here
  // Refer to the Usage section for usage examples
});

```


**NodeJS**

In a Node.js environment, you can install Atlas-Pay-SDK with npm:


``` bash
npm install atlas-pay-sdk

```

Then you can use it in your Node.js code like this:

```js

const AtlasPay = require('atlas-pay-sdk');

// Use AtlasPay object here
// Refer to the Usage section for usage examples

```


## API

**`AtlasPay.generate(config: PaymentConfig): void`**

This function is used to generate a new payment reference. The config parameter is an object that contains the following properties:

- customer_email: the email of the customer making the payment
- description: a brief description of the payment
- merchant_ref: your unique merchant reference for this payment
- amount: the amount to be paid
redirect_url: the URL to redirect the customer to after payment or when customer decides to cancel the payment
- payment_methods: a comma separated list of payment methods to enable (card, bank_transfer, ussd, raven)
- secret_key: your secret key

Example:

```js
let config = {
  "customer_email": "john@example.com",
  "description": "test payment",
  "merchant_ref": "your_merchant_reference",
  "amount": 100,
  "redirect_url": "",
  "payment_methods": "card,bank_transfer,ussd,raven",
  "secret_key": "your_atlas_secret_key"
};

AtlasPay.generate(config);

```

**`AtlasPay.init(ref: string): void`**

This function is used to initialize the payment window with the specified `payment_reference`. The `payment_reference` parameter is the reference generated using the `AtlasPay.generate()` function.

Example:

```js
AtlasPay.init('202304211026JBCAADE');

```

**`AtlasPay.shutdown(): void`**

This method is used to close the payment window and remove it from the DOM.

Example:

```js
AtlasPay.shutdown();

```

**`AtlasPay.onLoad(data: any): void`**

This callback is triggered when the payment window is loaded onto the DOM. The `data` parameter is an object containing the payment object.

Example:

```js
AtlasPay.onLoad(function(data) {
  console.log('Payment window loaded:', data);
});

```

**`AtlasPay.onSuccess(data: any): void`**

This callback is triggered when a payment is successful. The `data` parameter is an object containing the payload of the successful payment.

Example:

```js
AtlasPay.onSuccess(function(data) {
  console.log('Payment successful:', data);
});

```

**`AtlasPay.onClose(data: any): void`**

This callback is triggered when the payment window is closed. The `data` parameter is an object containing the message returned when the payment window is closed.

Example:

```js
AtlasPay.onClose(function(data) {
  console.log('Payment modal Closed:', data);
});

```

**`AtlasPay.onResponse(data: any): void`**

This callback is triggered when a new payment reference is generated using the `AtlasPay.generate()` function. The data parameter is an object containing the response returned from the server.

Example:

```js
AtlasPay.onResponse(function(data) {
  console.log('We got a response:', data);
});

```

## License

AtlasPay by Raven bank is licensed under the [**MIT**](http://opensource.org/licenses/MIT)



[npm-url]: https://www.npmjs.com/package/raven-bank-ui
[npm-image]: https://img.shields.io/npm/v/my-react-typescript-package
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml

[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package
