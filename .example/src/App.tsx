
import './App.css'
import React from 'react'

// import  AtlasPay  from 'atlas-pay-sdk';
import AtlasPay from '../../src/atlaspay'

// const AtlasPay = window.AtlasPaySdk
function App(): JSX.Element {
  AtlasPay.onSuccess = function (data) {
    /**
     * handle successful payment
     * (optional) : you can decide to retrieve the onClose message we send via data
    **/
    console.log('Payment successful:', data)
  }

  AtlasPay.onClose = function (data) {
    /**
     * handle close event, this happens when user closes the payment modal
     * (optional) : you can decide to retrieve the onClose message we send via data
    **/
    console.log('Payment modal Closed:', data)
  }

  AtlasPay.onResponse = function (data) {
    /**
     * handle generate response, this triggers when you try generating a new ref via AtlasPay.generate(), you catch ther response here
     * (required) : you are to retrieve the response via the data returned
    **/
    console.log('We got a response:', data) // or do your stuff here
  }

  AtlasPay.onLoad = function (data) {
    /**
  * this triggers when the payment window is loaded onto your dom, it returns for you a payload containing the payment object.
  * (optional) : you can decide to retrieve the payment object we send via data
 **/
    console.log('Payment window loaded:', data) // or do your stuff here
  }

  // set up your new payment parameters, along side your secret key

  const config : any = {
    customer_email: 'john@example.com',
    description: 'test payment',
    merchant_ref: 'your_merchant_reference',
    amount: 100,
    redirect_url: '',
    payment_methods: 'card,bank_transfer,ussd,raven',
    secret_key: 'RVSEC-ed8e7daf8c43a13f9cd81478925fbb80d2f1a67e4a630a10b87142527c4ded67b72b32f736e18e4be130efc055b1f528-1655335692169'
  }

  // console.log(AtlasPay)
  return (
    <React.Fragment>
      <button onClick={() => AtlasPay.generate(config)}>Generate New Ref</button>

      <button onClick={() => AtlasPay.init('202305021324ECIDEGI')}>Initialize Payment Window</button>
    </React.Fragment>
  )
}

export default App
