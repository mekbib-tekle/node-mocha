const should = require('chai').should();

describe('Basic Mocha tests', function () {
    it('should deal with objects', function() {
        const obj = {name: 'John Doe', gender: 'male'};
        const obj2 = {name: 'Tomy Tomato', gender: 'female'};

        obj.should.have.property('name').equal('John Doe');

        obj.should.not.deep.equal(obj2)
    });

    it('should deal with null', function() {
        const nullObj = null;
        should.not.exist(nullObj);
    });
})