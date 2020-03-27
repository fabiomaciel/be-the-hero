const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('#Generate Unique ID', function(){
  it('should generate an unique ID', function(){
    const id = generateUniqueId();
    expect(id).toHaveLength(26);
  })
});