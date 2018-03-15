'use strict';

const _ = require('lodash');

const Router = require('@cork-labs/monkfish-port-http').Router;

const defaults = {
  name: 'doocoop.auth.api.endpoint.application'
};

class ApplicationRouter extends Router {
  constructor (port, application, logger, config) {
    super(port, application, logger, _.merge({}, defaults, config));

    this.route('get', '/', {
      event: 'application.list',
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('get', '/:id', {
      event: 'application.get',
      response: (req, res, result, context) => {
        res.response.ok(result.data);
      }
    });

    this.route('post', '/', {
      event: 'application.create',
      request: (req, res, event, context) => {
        event.data = req.body;
      },
      response: (req, res, result, context) => {
        res.response.created(result.data);
      }
    });

    this.route('put', '/:id', {
      event: 'application.update',
      request: (req, res, event, context) => {
        event.params = req.params;
        event.data = req.body;
      },
      response: (req, res, result, context) => {
        res.response.noContent();
      }
    });

    this.route('delete', '/:id', {
      event: 'application.remove',
      response: (req, res, result, context) => {
        res.response.noContent();
      }
    });
  }
}

module.exports = ApplicationRouter;
