(function(global, factory) {
  typeof exports === 'object'
  && typeof module !== 'undefined'
  ? factory(exports) :
    typeof define === 'function'
    && define.amd
    ? define(['exports'], factory) :
      (factory(
          (global.MonaTs = global.MonaTs || {})
        )
      );
}(this, function(exports) {
  'use strict';

  function trigger() {
    console.log('hello world');
  }
  // expose the inner function on the module to use it
  exports.trigger = trigger;
}));


// (function(global, factory) {
//   typeof exports === 'object'
//   && typeof module !== 'undefined'
//   ? factory(exports, require('http'),
//   require('https'), require('url'),

//       typeof define === 'function'
//       && define.amd
//       ? define(['exports', 'https'], factory) :
//       (global = global || self, factory(global.AtlasPaySdk = {}, global.http, global.https, global.url, global.assert, global.stream, global.tty, global.util, global.os, global.zlib));
// }(this, (function(exports, http, https, url, assert, stream, tty, util, os, zlib) {
//           'use strict';
// }
