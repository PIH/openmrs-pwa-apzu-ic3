import reducer from './nutritionQueueReducer';

describe('nutritionQueueReducer', () => {

  // this reducer doesn't do much beyond the basics, so not much to test here

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  });

});

