'use strict';

const _ = require('lodash');

const emitterMixin = require('@cork-labs/mixin-emitter');
const monkfish = require('@cork-labs/monkfish');

const Application = monkfish.Application;

const AuthModule = require('@doocoop/module-auth');

const defaults = {
  modules: {
    auth: {}
  }
};

class App extends Application {
  constructor (db, config) {
    super(_.merge({}, defaults, config));
    this._db = db;

    const authConfig = this._config.modules.auth;
    const authModule = new AuthModule(db, authConfig);
    this.addModule(authModule);

    this._emitter = emitterMixin(this);
  }

  start () {
    return super.start()
      .then(() => {
        this._started = true;
        this._db.on('disconnected', (err) => {
          this._emitter.emit('fatal', err);
        });
        return this._db.connect();
      });
  }
}

module.exports = App;
