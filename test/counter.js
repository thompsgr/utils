var assert = require('assert');
var utils = require('../index.js');
var mycounter;
describe('counter()', function() {

    beforeEach(function() {
        mycounter = utils.counter('New Item');
    });

    describe('constructor', function() {
        it('should return -1 when no text description is provided', function() {
            assert.equal(utils.counter(), -1);
        });
        it('should return object with increment, items and log methods', function() {
            assert.equal(typeof mycounter, 'object');
            assert.equal(typeof mycounter.increment, 'function');
            assert.equal(typeof mycounter.items, 'function');
            assert.equal(typeof mycounter.log, 'function');
        });
    });
    describe('increment', function() {
        it('should return 1 for a new item added to increment', function() {
            assert.equal(mycounter.increment('Test'),1);
        });
        it('should return 2 for an item incremented two times', function() {
            mycounter.increment('Test');
            assert.equal(mycounter.increment('Test'),2);
        });
    });
    describe('items', function() {
        it('should return array of objects with item/count properties', function() {
            assert.equal(Array.isArray(mycounter.items()), true); 
            assert.equal(mycounter.items().length,0);
            mycounter.increment('A');
            mycounter.increment('A');
            mycounter.increment('B');
            var counter_array = mycounter.items();
            assert.equal(counter_array.length,2);
            assert.equal(typeof counter_array[0], 'object');
            assert.equal(counter_array[0].item,'A');
            assert.equal(counter_array[0].count,2);
            assert.equal(counter_array[1].item,'B');
            assert.equal(counter_array[1].count,1);
        });
        it('should return array with two items', function() {
            mycounter.increment('A');
            mycounter.increment('B');
            assert.equal(mycounter.items().length,2);
        });
        it('should return items sorted alphabetically', function() {
            mycounter.increment('B');
            mycounter.increment('D');
            mycounter.increment('A');
            mycounter.increment('C');
            assert.equal(mycounter.log(),'New Item: \nA...: 1 \nB...: 1 \nC...: 1 \nD...: 1 \n');
        });
        it('should return dense columnar array', function() {
            mycounter.increment('0');
            mycounter.increment('11');
            mycounter.increment('1');
            mycounter.increment('3');
            mycounter.increment('33');
            assert.equal(mycounter.items().length,5);
        });
        it('should return sparse columnar array', function() {
            mycounter.sparse(true);
            mycounter.increment(0);
            mycounter.increment(11);
            mycounter.increment(1);
            mycounter.increment(3);
            mycounter.increment(33);
            assert.equal(mycounter.items().length,34);
        });
    });
    describe('log', function() {
        it('should return description with no items', function() {
            assert.equal(mycounter.log(),'New Item: \n');
        });
        it('should return description with sparse integer items (right-padded)', function() {
            mycounter.sparse(true);
            mycounter.increment(1);
            for (var i = 0; i < 100; i++) {
                mycounter.increment(3);
            }
            assert.equal(mycounter.log(), 'New Item: \n0...:   0 \n1...:   1 \n2...:   0 \n3...: 100 \n');
        });
        it('should return description with items (right-padded)', function() {
            mycounter.increment('A');
            mycounter.increment('BB');
            mycounter.increment('BB');
            assert.equal(mycounter.log(),'New Item: \nA....: 1 \nBB...: 2 \n');
        });
    });
    describe.skip('skip', function() {
        it('should return pending', function() {
            throw new Error("fail");
        });
    });
});
