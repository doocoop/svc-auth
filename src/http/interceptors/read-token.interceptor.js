'use strict';

const defaults = {
  tokenCookie: 'access_token'
};

class ReadTokenInterceptor {
  constructor (config) {
    this._config = Object.assign({}, defaults, config);
  }

  handle (req, res, event, context) {
    context.rawAccessToken = req.cookies[this._config.tokenCookie];
  }
}

module.exports = ReadTokenInterceptor;
