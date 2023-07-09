# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.3](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v2.0.2...v2.0.3) (2023-07-08)

### [2.0.1](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v2.0.0...v2.0.1) (2023-05-10)

## [2.0.0](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.5...v2.0.0) (2023-04-29)

### ⚠ BREAKING CHANGES

- **rollup.config.js, package.json:** "refactor!: change default export of AtlasPay SDK, breaking change for imports".

### Features

- **rollup.config.js, package.json:** implement support for all javascript environment ([0f2b9eb](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/commit/0f2b9ebcfb28cb421e89023eb7fb6c02b49ac825))

<a name="1.1.5"></a>

## [1.1.5](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.4...v1.1.5) (2023-04-27)

<a name="1.1.4"></a>

## [1.1.4](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.3...v1.1.4) (2023-04-24)

<a name="1.1.3"></a>

## [1.1.3](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.2...v1.1.3) (2023-04-24)

### Bug Fixes

- **atlaspay.js:** Fixes to onSuccess triggering onLoad and onLoad trigering multiple times ([18925e4](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/commit/18925e4))

<a name="1.1.2"></a>

## [1.1.2](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.1...v1.1.2) (2023-04-24)

<a name="1.1.1"></a>

## [1.1.1](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.1.0...v1.1.1) (2023-04-23)

<a name="1.1.0"></a>

# [1.1.0](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.0.2...v1.1.0) (2023-04-22)

### Features

- **atlaspay.ts:** Introduced shutdown API to close payment window ([55dfcc7](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/commit/55dfcc7))

<a name="1.0.2"></a>

## [1.0.2](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.0.1...v1.0.2) (2023-04-22)

<a name="1.0.1"></a>

## [1.0.1](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v1.0.0...v1.0.1) (2023-04-22)

<a name="1.0.0"></a>

# [1.0.0](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/compare/v0.0.2...v1.0.0) (2023-04-22)

### Features

- **atlaspay.ts:** Complete integration & cross-platform communication with atlas parent webpay ([ff17118](https://github.com/RavenPayAfrica/atlas-webpay-node-sdk/commit/ff17118))

### BREAKING CHANGES

- **atlaspay.ts:** We no longer initialize the payment window by calling only AtlasPay() instead you
  will have to call AtlasPay.init('payment_reference')

<a name="0.0.1"></a>

## 0.0.1 (2023-04-21)
