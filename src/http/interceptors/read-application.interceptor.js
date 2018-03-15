'use strict';

const defaults = {
  applicationHeader: 'x-doocoop-application'
};

class ReadApplicationInterceptor {
  constructor (config) {
    this._config = Object.assign({}, defaults, config);
  }

  handle (req, res, event, context) {
    context.applicationId = req.headers[this._config.applicationHeader];
  }
}

module.exports = ReadApplicationInterceptor;
