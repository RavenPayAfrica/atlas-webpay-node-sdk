
  /**
   * @license
   * author: Ezeani Emmanuel <emmanuel.ezeani@getravenbank.com>
   * AtlasPaySdk.js v1.1.5
   * Released under the MIT license.
   */

import axios from 'axios';

var iframe = document.createElement('iframe');
var isLoaded = false;
var AtlasPay = {
    onSuccess: function (data) {
        return (data);
    },
    onClose: function (data) {
        return (data);
    },
    onLoad: function (data) {
        return (data);
    },
    onResponse: function (data) {
        return (data);
    },
    shutdown: function () {
        var parentElement = iframe.parentNode;
        parentElement.removeChild(iframe);
    },
    generate: function (_a) {
        var secret_key = _a.secret_key, customer_email = _a.customer_email, description = _a.description, merchant_ref = _a.merchant_ref, amount = _a.amount, redirect_url = _a.redirect_url, payment_methods = _a.payment_methods;
        if (!secret_key)
            throw new Error("secret_key is required");
        if (!customer_email)
            throw new Error("customer_email is required");
        if (!merchant_ref)
            throw new Error("merchant_email is required");
        if (!amount)
            throw new Error("amount is required");
        var payload = {
            customer_email: customer_email,
            description: description,
            merchant_ref: merchant_ref,
            amount: amount,
            redirect_url: redirect_url,
            payment_methods: payment_methods,
        };
        var requestConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://integrations.getravenbank.com/v1/webpay/create_payment',
            headers: {
                'Authorization': "Bearer ".concat(secret_key),
                'Content-Type': 'application/json'
            },
            data: payload
        };
        axios.request(requestConfig)
            .then(function (response) {
            AtlasPay.onResponse(response.data);
        })
            .catch(function (error) {
            AtlasPay.onResponse(error.response);
        });
    },
    init: function (trxRef) {
        iframe.style =
            'border: 0; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index:3000; overflow: hidden';
        iframe.allowTransparency = true;
        iframe.allow = 'clipboard-write';
        iframe.onload = function () {
            isLoaded = true;
        };
        // handle communication from webpay window
        window.addEventListener('message', function (event) {
            if (event.data.type) {
                var type = event.data.type;
                if (type === 'onSuccess' && event.data.message.status === 'paid') {
                    AtlasPay.onSuccess(event.data);
                }
                if (type === 'onclose') {
                    AtlasPay.onClose(event.data);
                }
                if (type === 'onLoad' && isLoaded) {
                    AtlasPay.onLoad(event.data);
                }
            }
        });
        if (trxRef) {
            iframe.src = "https://elaborate-blancmange-d0d15d.netlify.app/?ref=".concat(trxRef, "&platform=wordpress");
            document.body.appendChild(iframe);
        }
    },
};

// export { default as hello } from "./hello";

export { AtlasPay as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXNtLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYXRsYXNwYXkudHMiLCIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsLG51bGxdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBa0NBLElBQU0sTUFBTSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQWFyQixJQUFNLFFBQVEsR0FBc0I7SUFDbEMsU0FBUyxFQUFFLFVBQUMsSUFBSSxFQUFBO1FBQ2QsUUFBTyxJQUFJLEVBQUU7S0FDZDtJQUNELE9BQU8sRUFBRSxVQUFDLElBQUksRUFBQTtRQUNaLFFBQU8sSUFBSSxFQUFFO0tBQ2Q7SUFDRCxNQUFNLEVBQUUsVUFBQyxJQUFJLEVBQUE7UUFDWCxRQUFPLElBQUksRUFBRTtLQUNkO0lBQ0QsVUFBVSxFQUFFLFVBQUMsSUFBSSxFQUFBO1FBQ2YsUUFBTyxJQUFJLEVBQUU7S0FDZDtBQUNELElBQUEsUUFBUSxFQUFFLFlBQUE7QUFDUixRQUFBLElBQU0sYUFBYSxHQUFRLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDN0MsUUFBQSxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsUUFBUSxFQUFFLFVBQUMsRUFRRyxFQUFBO0FBUFosUUFBQSxJQUFBLFVBQVUsZ0JBQUEsRUFDVixjQUFjLG9CQUFBLEVBQ2QsV0FBVyxpQkFBQSxFQUNYLFlBQVksR0FBQSxFQUFBLENBQUEsWUFBQSxFQUNaLE1BQU0sR0FBQSxFQUFBLENBQUEsTUFBQSxFQUNOLFlBQVksR0FBQSxFQUFBLENBQUEsWUFBQSxFQUNaLGVBQWUsR0FBQSxFQUFBLENBQUEsZUFBQSxDQUFBO0FBR2YsUUFBQSxJQUFJLENBQUMsVUFBVTtBQUFFLFlBQUEsTUFBTSxJQUFJLEtBQUssQ0FBRSx3QkFBd0IsQ0FBQyxDQUFBO0FBQzNELFFBQUEsSUFB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
