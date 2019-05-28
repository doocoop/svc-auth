'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

const App = require('../src/app');

describe('App', function () {
  it('should be a function', function () {
    expect(App).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.app = new App();
      this.db = {
        on: sinon.spy(),
        connect: sinon.spy()
      };
    });

    it('should expose the methods', function () {
      expect(this.app.start).to.be.a('function');
    });
  });
});
