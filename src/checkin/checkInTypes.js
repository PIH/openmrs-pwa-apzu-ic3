import types from 'redux-types';

export default  {
  CHECK_IN: types('checkin', ['SUBMIT', 'FAILED', 'SUCCEEDED', 'GET_EXPECTED_PATIENTS_TO_CHECKIN', 'GET_EXPECTED_TO_CHECKIN_FAILED', 'EXPECTED_TO_CHECK_IN']),
  CHECK_OUT: types('checkout', ['SUBMIT', 'FAILED', 'SUCCEEDED'])
}
