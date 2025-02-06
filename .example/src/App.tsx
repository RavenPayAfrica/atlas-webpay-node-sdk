import React, { useEffect, useRef } from 'react';
import BankboxManager from '../../src/manager';

const BankboxWidget: React.FC = () => {
  const bankbox = new BankboxManager({
    appName: 'bankly',
    // environment: 'sandbox',
    // containerId: 'bankbox-container',
    // widgetOptions: {
    //   theme: 'dark',
    //   paymentMethod: 'card'
    // },
    onSuccess: (data) => {
      console.log('Payment succeeded:', data);
    },
    onLoad: () => {
      console.log('Bankbox is ready');
    },
    onFail: (data) => {},
    onError: (error) => {
      console.error('An error occurred:', error);
    }
  });
  

    return <React.Fragment>
       <button onClick={() => bankbox.open({ email: "ayenikehinded4@gmail.com"})}>
          Open
        </button>
    </React.Fragment>
};

export default BankboxWidget;