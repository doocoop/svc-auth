'use strict';

const _ = require('lodash');

const Router = require('@cork-labs/monkfish-port-http').Router;

const defaults = {
  name: 'doocoop.auth.api.endpoint.auth',
  tokenCookie: 'access_token'
};

class AuthRouter extends Router {
  constructor (port, application, logger, config) {
    super(port, application, logger, _.merge({}, defaults, config));
    const $c = this._config;

    this.route('get', '/me', {
      event: 'auth.me',
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('post', '/login', {
      event: 'auth.login',
      request: (req, res, event, context) => {
        event.params.username = req.body.username;
        event.params.password = req.body.password;
      },
      response: (req, res, result, context) => {
        res.setSessionCookie($c.tokenCookie, result.meta.token);
        res.response.ok(result.data);
      }
    });

    this.route('post', '/signup', {
      event: 'auth.signup',
      request: (req, res, event, context) => {
        event.data.username = req.body.username;
        event.data.password = req.body.password;
      },
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('post', '/logout', {
      event: 'auth.logout',
      response: (req, res, result, context) => {
        res.unsetCookie($c.tokenCookie);
        res.response.noContent();
      }
    });
  }
}

module.exports = AuthRouter;
