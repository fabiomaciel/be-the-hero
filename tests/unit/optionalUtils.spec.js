const { envOrElse } = require('../../src/utils/optionalUtils');

describe('#Generate Unique ID', function () {
  it('should get a env var', function () {
    const NODE_ENV = envOrElse('NODE_ENV')
    expect(NODE_ENV).toEqual('test');
  });

  it('should get a default value if a env var does not exist', function () {
    const DEFAULT_VALUE = 'defaultValue';
    const NODE_ENV = envOrElse('NOT_EXIST_ENV', DEFAULT_VALUE)
    expect(NODE_ENV).toEqual(DEFAULT_VALUE);
  });
});