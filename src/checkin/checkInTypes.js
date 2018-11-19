import types from 'redux-types';

export default  {
  CHECK_IN: types('checkin', ['SUBMIT', 'FAILED', 'SUCCEEDED']),
  CHECK_OUT: types('checkout', ['SUBMIT', 'FAILED', 'SUCCEEDED'])
}
