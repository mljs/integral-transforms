# integral-transforms

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

<p align="center">
  <img src="image/readme.png">
</p>
<p align="center">
  A tool for line broadening through integral transforms.
</p>

## Installation

`$ npm i integral-transforms`

## Usage

```js
import { integralTransform } from 'integral-transform';

const signal = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
const broadedSignal = integralTransform(signal);
// [0.1, 0.3, 0.6, 0.9, 1.2, 1.3, 1.2, 0.9, 0.6, 0.3, 0.1]
```

**Shapes**

- Gaussian
- Lorentzian

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/integral-transforms.svg
[npm-url]: https://www.npmjs.com/package/integral-transforms
[ci-image]: https://github.com/mljs/integral-transforms/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/integral-transforms/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/integral-transforms.svg
[codecov-url]: https://codecov.io/gh/mljs/integral-transforms
[download-image]: https://img.shields.io/npm/dm/integral-transforms.svg
[download-url]: https://www.npmjs.com/package/integral-transforms
