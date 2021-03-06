'use strict';

const _ = require('lodash');

const Router = require('@cork-labs/monkfish-port-http').Router;

const defaults = {
  name: 'doocoop.auth.api.endpoint.account'
};

class AccountRouter extends Router {
  constructor (port, application, logger, config) {
    super(port, application, logger, _.merge({}, defaults, config));
    // const $c = this._config;

    this.route('get', '/', {
      event: 'account.list',
      middlewares: ['doocoop.http-middleware.read-token'],
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('get', '/:id', {
      event: 'account.get',
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('post', '/', {
      event: 'account.create',
      request: (req, res, event, context) => {
        event.data = req.body;
      },
      response: (req, res, result, context) => {
        res.response.created(result.data);
      }
    });

    this.route('put', '/:id', {
      event: 'account.update',
      request: (req, res, event, context) => {
        event.params = req.params;
        event.data = req.body;
      },
      response: (req, res, result, context) => {
        res.response.noContent();
      }
    });

    this.route('delete', '/:id', {
      event: 'account.remove',
      response: (req, res, result, context) => {
        res.response.noContent();
      }
    });
  }
}

module.exports = AccountRouter;
