'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const Api = require('../../src/http/Api');

describe('Api', function () {
  it('should be a function', function () {
    expect(Api).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.api = new Api();
    });

    it('should expose the methods', function () {
      expect(this.api.start).to.be.a('function');
    });
  });
});
