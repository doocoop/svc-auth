#!/usr/bin/env node

'use strict';

const path = require('path');

const ConfigReader = require('@cork-labs/config-reader');

const Logger = require('@cork-labs/monkfish-adapter-logger');
const MongooseAdapter = require('@cork-labs/monkfish-adapter-mongoose').MongooseAdapter;

const App = require('../src/app');
const Api = require('../src/http/api');

const environment = process.env.NODE_ENV || 'development';
const configDir = process.env.CONFIG_DIR || './config';

const configReader = new ConfigReader();
configReader.readDataDir(path.join(configDir, 'defaults'));
configReader.readDataDir(path.join(configDir, environment));
configReader.readVarsFile(path.join(configDir, 'defaults.vars.json'));
configReader.readVarsFile(path.join(configDir, environment + '.vars.json'));
configReader.readVarsFile(path.join(configDir, 'env.vars.json'));
const config = configReader.getData();

const logger = new Logger(config.name, config.log);
const db = new MongooseAdapter(logger, config.mongodb);
const app = new App(db, config.app);

const api = new Api(app, logger, config.api);

logger.info({ config }, 'svc.start');
app.start()
  .then(() => api.start())
  .then(() => logger.info('svc.started'))
  .catch((err) => {
    logger.error({ err }, 'svc.fail');
    process.exit(1);
  });

app.on('fatal', (err) => {
  logger.error({ err }, 'svc.crash');
  process.exit(1);
});
