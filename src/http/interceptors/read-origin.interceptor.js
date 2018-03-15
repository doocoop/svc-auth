'use strict';

const defaults = {};

class ReadOriginInterceptor {
  constructor (config) {
    this._config = Object.assign({}, defaults, config);
  }

  handle (req, res, event, context) {
    context.origin = req.headers.origin;
  }
}

module.exports = ReadOriginInterceptor;
