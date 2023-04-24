import axios, {Method} from 'axios';
interface PayProp {
  trxRef?: string
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


interface IframeProps extends HTMLIFrameElement {
  style: any;
  allowTransparency?: boolean;
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

const iframe: IframeProps = document.createElement('iframe');


interface AtlasPayInterface {
  onSuccess: (data: any) => void,
  onClose: (data: any) => void,
  onResponse: (data: any) => void,
  onLoad: (data: any) => void,
  init: (trxRef: PayProp) => void,
  generate: (data : ConfigProp) => void
  shutdown: (data: any) => void
}

const AtlasPay: AtlasPayInterface = {
  onSuccess: (data) => {
    return(data);
  },
  onClose: (data) => {
    return(data);
  },
  onLoad: (data) => {
    return(data);
  },
  onResponse: (data) => {
    return(data);
  },
  shutdown: () => {
    const parentElement: any = iframe.parentNode;
    parentElement.removeChild(iframe);
  },
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
    const requestConfig: RequestProp = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://integrations.getravenbank.com/v1/webpay/create_payment',
      headers: {
        'Authorization': `Bearer ${secret_key}`,
        'Content-Type': 'application/json'
      },
      data: payload
    };

    axios.request(requestConfig)
      .then((response) => {
        AtlasPay.onResponse(response.data);
      })
      .catch((error) => {
        AtlasPay.onResponse(error.response);
      });
  },

  init: (trxRef) => {

    iframe.style =
      'border: 0; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index:3000; overflow: hidden';
    iframe.allowTransparency = true;
    iframe.allow = 'clipboard-write';

    // handle communication from webpay window
    window.addEventListener('message',  (event) => {

      if (event.data.type) {
        const { type } = event.data;

        if (type === 'onSuccess' && event.data.message.status === 'paid') {
          AtlasPay.onSuccess(event.data);
        }

        if (type === 'onclose') {
          AtlasPay.onClose(event.data);
        }

        if (type === 'onLoad') {
          AtlasPay.onClose(event.data);
        }
      }
    });

    if (trxRef) {
      iframe.src = `https://elaborate-blancmange-d0d15d.netlify.app/?ref=${trxRef}&platform=wordpress`;
      document.body.appendChild(iframe);
    }

  },
}

export default AtlasPay;
