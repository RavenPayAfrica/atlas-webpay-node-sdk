import axios, { Method } from 'axios';
interface PayProp {
  trx_ref?: string
}

interface ConfigProp {

  secret_key: string,
  customer_email: string,
  description : string,
  merchant_ref: string,
  amount: number,
  redirect_url?: string,
  payment_methods? : ["card","bank_transfer","ussd","raven"]

}

interface RequestProp {
  method: Method,
  maxBodyLength: number,
  url: string,
  headers: {
    Authorization: string,
    "Content-Type": string,
  }
  data: any
}

interface AtlasPayInterface {
  onSuccess: (data: any) => void,
  onClose: (data: any) => void,
  onResponse: (data: any) => void,
  onLoad: (data: any) => void,
  init: (trx_ref: PayProp) => void,
  generate: (data : ConfigProp) => void
}

const AtlasPay: AtlasPayInterface = {
  onSuccess: (data) => {
  },
  onClose: (data) => {
  },
  onLoad: (data) => {},
  onResponse: (data) => {},
  generate: ({
    secret_key,
    customer_email,
    description ,
    merchant_ref,
    amount,
    redirect_url,
    payment_methods
  } : ConfigProp ) => {

    if (!secret_key) throw new Error ("secret_key is required")
    if (!customer_email) throw new Error ("customer_email is required")
    if (!merchant_ref) throw new Error ("merchant_email is required")
    if (!amount) throw new Error ("amount is required")

    const payload = {
  customer_email,
  description ,
  merchant_ref,
  amount,
  redirect_url,
  payment_methods ,
    }
    let api_config: RequestProp = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://integrations.getravenbank.com/v1/webpay/create_payment',
      headers: {
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    axios.request(api_config)
      .then((response) => {
        AtlasPay.onResponse(response.data);
      })
      .catch((error) => {
        AtlasPay.onResponse(error.response);
      });
  },
  init: (trx_ref) => {

    interface IframeProps extends HTMLIFrameElement {
      style: any;
      allowTransparency?: boolean;
    }
    const iframe: IframeProps = document.createElement('iframe');
    iframe.style =
      'border: 0; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index:3000; overflow: hidden';
    iframe.allowTransparency = true;
    iframe.allow = 'clipboard-write';

    // handle communication from webpay window
    window.addEventListener('message', function (event) {
      if (event.data.type) {
        const { type } = event.data;

        if (type === 'onSuccess') {
          AtlasPay.onSuccess(event.data);
        }

        if (type === 'onclose') {
          AtlasPay.onClose(event.data);
        }
      }
    });

    if (trx_ref) {
      iframe.src = `https://elaborate-blancmange-d0d15d.netlify.app/?ref=${trx_ref}&platform=wordpress`;
      document.body.appendChild(iframe);
    }

  },
}

export default AtlasPay;
