const assert = require('assert');
const { randomNumber, sendData } = require('../client/client');

test('should generate random number between min and max', () => {
        assert.equal(randomNumber(1, 2), 2);
});
