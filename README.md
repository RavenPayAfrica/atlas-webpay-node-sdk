# @ravenpay/bankbox-me-sdk

## Introduction

`@ravenpay/bankbox-me-sdk` is a JavaScript SDK designed to seamlessly integrate the Bankbox payment widget into web applications. This SDK allows developers to embed and manage the Bankbox widget for handling transactions with customizable configurations.

## Installation

Install the SDK via npm:

```sh
npm install @ravenpay/bankbox-me-sdk
```

Or using yarn:

```sh
yarn add @ravenpay/bankbox-me-sdk
```

## Usage

### Importing the SDK

```javascript
import BankboxManager from '@ravenpay/bankbox-me-sdk';
```

### Initializing the SDK

Create an instance of `BankboxManager` with the required configuration:

```javascript
const bankbox = new BankboxManager({
  appName: 'your-app-name',
  environment: 'sandbox', // or 'production' only production supported, you can leave blank for production
  // widgetOptions: {},
  containerId: 'bankbox-container' //optional,
  onSuccess: (data) => console.log('Transaction Successful:', data),
  onFail: (data) => console.log('Transaction Failed:', data),
  onError: (error) => console.error('Error:', error),
  onLoad: () => console.log('Bankbox Loaded'),
});
```

### Mounting the Widget

To mount the Bankbox widget inside a specific container:

```javascript
bankbox.mount({
  email: 'user@example.com',
  amount: 1000,
  containerId: 'custom-container-id',
});
```

### Opening the Widget

To display the Bankbox widget as an overlay:

```javascript
bankbox.open({
  email: 'user@example.com',
  amount: 1000,
});
```

### Closing the Widget

To close the Bankbox widget manually:

```javascript
bankbox.close();
```

### Event Listeners

You can listen to various events using event listeners:

```javascript
bankbox.addEventListener('success', (data) => {
  console.log('Transaction Successful:', data);
});

bankbox.addEventListener('fail', (data) => {
  console.log('Transaction Failed:', data);
});

bankbox.addEventListener('error', (error) => {
  console.error('Error:', error);
});
```

To remove an event listener:

```javascript
bankbox.removeEventListener('success', callbackFunction);
```

### Destroying the Widget

To completely remove the Bankbox instance and clean up event listeners:

```javascript
bankbox.destroy();
```

## Configuration Options

| Property       | Type       | Description |
|---------------|------------|-------------|
| `appName`      | `string`   | Your application name |
| `environment`  | `'sandbox' | 'production'` | The environment for transactions |
| `widgetOptions` | `object`  | Additional configuration options for the widget |
| `containerId`  | `string`   | ID of the container element for embedding the widget |
| `onSuccess`    | `function` | Callback triggered on successful transactions |
| `onFail`      | `function`  | Callback triggered on failed transactions |
| `onError`     | `function`  | Callback triggered on widget errors |
| `onLoad`      | `function`  | Callback triggered when the widget loads |

## Events

| Event Type | Description |
|------------|-------------|
| `success`  | Triggered when a transaction is successful |
| `fail`     | Triggered when a transaction fails |
| `error`    | Triggered when an error occurs in the widget |
| `load`     | Triggered when the widget loads |


## Styling Notes
The default container includes:
- Semi-transparent overlay with blur effect
- Bottom-mounted modal with rounded corners
- Close button styled with black background
- Responsive iframe sizing

Override styles by:
- Providing your own container element
- Adding custom CSS rules targeting `#bankbox-container`

## Security Considerations
- Uses `postMessage` with strict origin validation
- Ensure your domain is whitelisted for production use
- Never expose API keys in client-side code

## Browser Support
Modern browsers (Chrome 80+, Firefox 72+, Safari 13+). Requires:
- ES6 support
- Promise API
- `postMessage` API

## Troubleshooting
### Widget not loading:
- Check if the container element exists in the DOM
- Verify network requests aren't blocked
- Ensure correct environment configuration

### Events not firing:
- Verify origin matches your `appName` configuration
- Check for console errors
- Ensure event listeners are registered before mount



## License

MIT License. See [LICENSE](LICENSE) for details.



