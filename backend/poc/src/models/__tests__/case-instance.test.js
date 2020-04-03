import {CaseInstance} from '../case-instance';

describe('CaseInstance', () => {
  it('should return the name', () => {
    // const CaseInstance = require('../case-instance');
    const ci = new CaseInstance(1, 'a');
    expect(ci.name).toBe('a');
  });  
});

