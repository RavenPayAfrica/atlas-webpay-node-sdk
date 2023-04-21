# Atlas Pay by Raven

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]![License][github-license]][github-license-url]

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
npm install atlas-pay

or

```bash
yarn add atlas-pay
````

## Usage :

Atlas-Pay provides you with few Javascript API's to interact with below is an example implementation of the atlas-pay library:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RavenButton } from 'raven-bank-ui'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <div>
            <h2>My Raven Button</h2>
            <RavenButton />
        </div>
        <hr />
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/raven-bank-ui
[npm-image]: https://img.shields.io/npm/v/my-react-typescript-package
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml

[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package
"postbuild": "node scripts/copy && npm run size",
