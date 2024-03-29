const assert = require('assert');
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const auth = require('../src/auth');

chai.use(chaiAsPromised);
chai.should();

describe('Auth', () => {
  describe('isAuthorized', () => {
    it('Should return false if not authorized', () => {
      auth.setRoles(['user']);
      const isAuthorized = auth.isAuthorized('admin');
      assert.equal(false, isAuthorized);
    });

    it('Should return true if authorized', () => {
      auth.setRoles(['user', 'admin']);
      const isAuthorized = auth.isAuthorized('admin');
      // assert.equal(true, isAuthorized);
      isAuthorized.should.be.true;
    });
  });

  describe('isAuthorizedAsync', () => {
    it('Should return false if not authorized', function (done) {
      this.timeout(2500);
      auth.setRoles(['user']);
      auth.isAuthorizedAsync('admin', (isAuthorized) => {
        assert.equal(false, isAuthorized);
        done();
      });
    });

    it('Should return true if authorized', function (done) {
      this.timeout(2500);
      auth.setRoles(['user', 'admin']);
      auth.isAuthorizedAsync('admin', (isAuthorized) => {
        assert.equal(true, isAuthorized);
        done();
      });
    });
  });

  describe('isAuthorizedPromise', () => {
    it('Should return false if not authorized', () => {
      auth.setRoles(['user']);
      return auth.isAuthorizedPromise('admin')
        .should
        .eventually
        .be
        .false;
    });
  });

  describe('getIndex', function () {
    it('should render index', function () {
      const req = {};
      const res = {
        render: sinon.spy(),
      };
      auth.getIndex(req, res);
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('index');
    });
  });


});
