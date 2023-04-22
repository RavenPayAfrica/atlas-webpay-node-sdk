
import './App.css'
import  AtlasPay  from '../../src/atlaspay';

function App() {
  AtlasPay.onSuccess = function(data) {
    /**
     * handle successful payment
     * (optional) : you can decide to retrieve the onClose message we send via data
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
     * handle generate respons, this triggers when you try generating a new ref via AtlasPay.generate(), you catch ther response here
     * (optional) : you can decide to retrieve the onClose message we send via data
    **/
      console.log('We got a response:', data); // or do your stuff here
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
    <button onClick={()=> AtlasPay.generate(config)}>Generate New Ref</button>

     <button onClick={()=> AtlasPay.init('202304211026JBCAADE')}>Initialize Payment Window</button>
    </>
  )
}

export default App
