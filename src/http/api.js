'use strict';

const _ = require('lodash');

const Port = require('@cork-labs/monkfish-port-http').Port;

const AccountRouter = require('./router/account.router');
const ApplicationRouter = require('./router/application.router');
const AuthRouter = require('./router/auth.router');
const UserRouter = require('./router/user.router');

const ReadOriginInterceptor = require('./interceptors/read-origin.interceptor');
const ReadTokenInterceptor = require('./interceptors/read-token.interceptor');
const ReadApplicationInterceptor = require('./interceptors/read-application.interceptor');

const defaults = {
  name: 'doocoop.auth.api',
  interceptors: {},
  routers: {}
};

class Api extends Port {
  constructor (app, logger, config) {
    super(logger, _.merge({}, defaults, config));
    const $c = this._config;

    this.notFound((req, res) => {
      res.response.notFound({ resource: 'doocoop.auth.api.endpoint' });
    });

    this.interceptor(new ReadOriginInterceptor($c.interceptors.readOrigin));
    this.interceptor(new ReadTokenInterceptor($c.interceptors.readToken));
    this.interceptor(new ReadApplicationInterceptor($c.interceptors.readApplication));

    this.pre(ReadOriginInterceptor);
    this.pre(ReadTokenInterceptor);
    this.pre(ReadApplicationInterceptor);

    const accountRouter = new AccountRouter(this, app, logger, $c.routers.account);
    this.route('/account', accountRouter);

    const applicationRouter = new ApplicationRouter(this, app, logger, $c.routers.application);
    this.route('/application', applicationRouter);

    const authRouter = new AuthRouter(this, app, logger, $c.routers.auth);
    this.route('/auth', authRouter);

    const userRouter = new UserRouter(this, app, logger, $c.routers.user);
    this.route('/user', userRouter);
  }

  // -- public

  start () {
    return super.start();
  }
}

module.exports = Api;
