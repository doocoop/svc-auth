'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const Svc = require('../src/Svc');

describe('Svc', function () {
  it('should be a function', function () {
    expect(Svc).to.be.a('function');
  });

  describe('api', function () {
    beforeEach(function () {
      this.svc = new Svc();
    });

    it('should expose the methods', function () {
      expect(this.svc.start).to.be.a('function');
    });
  });
});
